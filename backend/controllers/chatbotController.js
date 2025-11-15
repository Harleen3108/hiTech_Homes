const Property = require("../models/Property");

/**
 * Handle chatbot message with AI-powered responses using OpenAI
 */
exports.handleChatMessage = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    console.log("📩 User message:", message);

    // Search for properties based on user query
    const properties = await searchProperties(message);
    console.log("🔍 Properties found:", properties.length);

    // If no exact matches, get alternative suggestions
    let alternatives = [];
    if (properties.length === 0) {
      alternatives = await getAlternativeSuggestions(message);
      console.log("💡 Alternative suggestions:", alternatives.length);
    }

    // Generate AI response using OpenAI API
    const aiResponse = await generateAIResponse(
      message,
      properties,
      alternatives,
      conversationHistory
    );
    console.log("🤖 AI Response generated");

    res.status(200).json({
      success: true,
      reply: aiResponse,
      properties:
        properties.length > 0
          ? properties.slice(0, 3)
          : alternatives.length > 0
          ? alternatives.slice(0, 3)
          : null,
    });
  } catch (error) {
    console.error("❌ Chatbot error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process message",
      reply:
        "I apologize, but I encountered an error. Please try again or contact our support team.",
    });
  }
};

/**
 * Search properties based on user query
 */
async function searchProperties(query) {
  try {
    const lowerQuery = query.toLowerCase();

    // Extract BHK from query
    const bhkMatch = lowerQuery.match(/(\d+)\s*(bhk|bedroom|bed)/);
    const bhk = bhkMatch ? parseInt(bhkMatch[1]) : null;

    // Extract price range
    let minPrice = null;
    let maxPrice = null;

    const underMatch = lowerQuery.match(
      /under|below|less than|up to\s*(\d+)\s*(lakh|l|cr|crore)/
    );
    if (underMatch) {
      const amount = parseFloat(underMatch[1]);
      const unit = underMatch[2];
      maxPrice = unit.startsWith("cr") ? amount * 10000000 : amount * 100000;
    }

    const rangeMatch = lowerQuery.match(
      /(\d+)\s*-\s*(\d+)\s*(lakh|l|cr|crore)/
    );
    if (rangeMatch) {
      const min = parseFloat(rangeMatch[1]);
      const max = parseFloat(rangeMatch[2]);
      const unit = rangeMatch[3];
      minPrice = unit.startsWith("cr") ? min * 10000000 : min * 100000;
      maxPrice = unit.startsWith("cr") ? max * 10000000 : max * 100000;
    }

    // Extract city from query
    const cityMatch = lowerQuery.match(/in\s+(\w+)|(\w+)\s+city|near\s+(\w+)/);
    const city = cityMatch
      ? cityMatch[1] || cityMatch[2] || cityMatch[3]
      : null;

    // Build MongoDB query
    let searchQuery = {};

    if (bhk) {
      searchQuery.bhk = bhk;
    }

    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = minPrice;
      if (maxPrice) searchQuery.price.$lte = maxPrice;
    }

    if (city) {
      searchQuery.city = new RegExp(city, "i");
    }

    // If query is generic, return recent properties
    if (Object.keys(searchQuery).length === 0) {
      if (
        lowerQuery.includes("property") ||
        lowerQuery.includes("house") ||
        lowerQuery.includes("flat") ||
        lowerQuery.includes("apartment") ||
        lowerQuery.includes("show") ||
        lowerQuery.includes("available")
      ) {
        return await Property.find().sort({ createdAt: -1 }).limit(5);
      }
      return [];
    }

    // Execute search
    const properties = await Property.find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(5);

    return properties;
  } catch (error) {
    console.error("❌ Property search error:", error);
    return [];
  }
}

/**
 * Get alternative property suggestions when exact match not found
 */
async function getAlternativeSuggestions(query) {
  try {
    const lowerQuery = query.toLowerCase();

    // Extract criteria from query
    const bhkMatch = lowerQuery.match(/(\d+)\s*(bhk|bedroom|bed)/);
    const bhk = bhkMatch ? parseInt(bhkMatch[1]) : null;

    const underMatch = lowerQuery.match(
      /under|below|less than|up to\s*(\d+)\s*(lakh|l|cr|crore)/
    );
    let maxPrice = null;
    if (underMatch) {
      const amount = parseFloat(underMatch[1]);
      const unit = underMatch[2];
      maxPrice = unit.startsWith("cr") ? amount * 10000000 : amount * 100000;
    }

    const cityMatch = lowerQuery.match(/in\s+(\w+)|(\w+)\s+city|near\s+(\w+)/);
    const city = cityMatch
      ? cityMatch[1] || cityMatch[2] || cityMatch[3]
      : null;

    // Strategy 1: Relax price constraint (increase by 20%)
    if (maxPrice && bhk) {
      const relaxedMaxPrice = maxPrice * 1.2;
      const alternatives = await Property.find({
        bhk: bhk,
        price: { $lte: relaxedMaxPrice },
        ...(city && { city: new RegExp(city, "i") }),
      })
        .sort({ price: 1 })
        .limit(3);

      if (alternatives.length > 0) return alternatives;
    }

    // Strategy 2: Try adjacent BHK (±1)
    if (bhk && maxPrice) {
      const alternatives = await Property.find({
        bhk: { $in: [bhk - 1, bhk + 1] },
        price: { $lte: maxPrice },
        ...(city && { city: new RegExp(city, "i") }),
      })
        .sort({ bhk: 1, price: 1 })
        .limit(3);

      if (alternatives.length > 0) return alternatives;
    }

    // Strategy 3: Same BHK, any price in that city
    if (bhk && city) {
      const alternatives = await Property.find({
        bhk: bhk,
        city: new RegExp(city, "i"),
      })
        .sort({ price: 1 })
        .limit(3);

      if (alternatives.length > 0) return alternatives;
    }

    // Strategy 4: Same price range, any BHK
    if (maxPrice) {
      const alternatives = await Property.find({
        price: { $lte: maxPrice * 1.3 },
      })
        .sort({ price: 1 })
        .limit(3);

      if (alternatives.length > 0) return alternatives;
    }

    // Strategy 5: Show recent properties
    return await Property.find().sort({ createdAt: -1 }).limit(3);
  } catch (error) {
    console.error("❌ Alternative suggestions error:", error);
    return [];
  }
}

/**
 * Generate AI response using OpenAI API
 */
async function generateAIResponse(
  userMessage,
  properties,
  alternatives,
  conversationHistory = []
) {
  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not found in environment");
      return generateFallbackResponse(userMessage, properties, alternatives);
    }

    // Determine search result status
    let searchStatus = "";
    if (properties.length > 0) {
      searchStatus = "EXACT_MATCH";
    } else if (alternatives.length > 0) {
      searchStatus = "NO_EXACT_MATCH_BUT_ALTERNATIVES";
    } else {
      searchStatus = "NO_RESULTS";
    }

    // Build conversation messages
    const messages = [
      {
        role: "system",
        content: `You are an intelligent property assistant for Hi-Tech Homes real estate website. Your role is to:

1. Answer user questions naturally and conversationally
2. Help users find properties based on their specific requirements
3. Provide detailed information about properties, pricing, locations, and amenities
4. When no exact match found, politely inform user and suggest alternatives
5. Be friendly, helpful, and always respond directly to what the user asks

SEARCH STATUS: ${searchStatus}

${
  searchStatus === "EXACT_MATCH" && properties.length > 0
    ? `
✅ PERFECT MATCHES FOUND:
${properties
  .map(
    (p, i) => `
${i + 1}. ${p.title}
   💰 Price: ₹${p.price.toLocaleString()}
   🏠 Config: ${p.bhk} BHK, ${p.bathrooms} Bathrooms
   📍 Location: ${p.city}, ${p.address}
   📏 Area: ${p.area || "Not specified"}
   ✨ Amenities: ${p.amenities.join(", ") || "Basic amenities"}
`
  )
  .join("\n")}

Present these properties enthusiastically! These are exactly what the user is looking for! 🎉
`
    : ""
}

${
  searchStatus === "NO_EXACT_MATCH_BUT_ALTERNATIVES" && alternatives.length > 0
    ? `
⚠️ NO EXACT MATCHES for the user's specific requirements.

However, we have ALTERNATIVE SUGGESTIONS:
${alternatives
  .map(
    (p, i) => `
${i + 1}. ${p.title}
   💰 Price: ₹${p.price.toLocaleString()}
   🏠 Config: ${p.bhk} BHK, ${p.bathrooms} Bathrooms
   📍 Location: ${p.city}, ${p.address}
   📏 Area: ${p.area || "Not specified"}
   ✨ Amenities: ${p.amenities.join(", ") || "Basic amenities"}
`
  )
  .join("\n")}

IMPORTANT:
- First apologize that we don't have exact matches for their requirements
- Explain what's different (price, BHK, location)
- Present these alternatives as "close matches" or "similar options"
- Be encouraging: "You might also like..." or "Here are some great alternatives..."
- Ask if they'd like to adjust their budget/requirements
`
    : ""
}

${
  searchStatus === "NO_RESULTS"
    ? `
❌ NO PROPERTIES FOUND matching the user's query AND no suitable alternatives.

IMPORTANT:
- Politely apologize: "I'm sorry, we don't currently have properties matching your exact requirements."
- Ask for their contact details: "However, I can notify you when matching properties become available!"
- Suggest they try: Different budget range, different BHK, different location
- Offer to show them our latest properties
- Be empathetic and helpful
`
    : ""
}

CONVERSATION STYLE:
- Be warm, friendly, and empathetic
- Answer questions directly and naturally
- Use emojis occasionally: 🏠 🔑 💰 📍 ✨ 😊
- When no match: be apologetic but helpful
- Always end with a helpful follow-up question
- Keep responses concise but informative (2-4 sentences for most answers)`,
      },
    ];

    // Add conversation history
    conversationHistory
      .filter((msg) => msg.type !== "system")
      .slice(-6)
      .forEach((msg) => {
        messages.push({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.text,
        });
      });

    // Add current message
    messages.push({
      role: "user",
      content: userMessage,
    });

    console.log("🔄 Calling OpenAI API...");

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ OpenAI API Error:", errorData);
      return generateFallbackResponse(userMessage, properties, alternatives);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log("✅ OpenAI response received");
      return data.choices[0].message.content;
    }

    console.error("❌ Unexpected OpenAI response format:", data);
    return generateFallbackResponse(userMessage, properties, alternatives);
  } catch (error) {
    console.error("❌ AI generation error:", error.message);
    return generateFallbackResponse(userMessage, properties, alternatives);
  }
}

/**
 * Fallback response when AI is unavailable
 */
function generateFallbackResponse(message, properties, alternatives) {
  const lowerMessage = message.toLowerCase();

  // Exact matches found
  if (properties.length > 0) {
    return `Great news! I found ${
      properties.length
    } properties that match your requirements! 🎉\n\nThe top match is "${
      properties[0].title
    }" priced at ₹${properties[0].price.toLocaleString()} in ${
      properties[0].city
    }. It's a ${properties[0].bhk} BHK with ${
      properties[0].bathrooms
    } bathrooms.\n\nCheck out the property cards below for more details. Would you like to know more about any of these?`;
  }

  // No exact match but alternatives available
  if (alternatives.length > 0) {
    return `I'm sorry, we don't have properties that exactly match your requirements right now. 😔\n\nHowever, I found ${
      alternatives.length
    } similar properties you might like! The closest match is "${
      alternatives[0].title
    }" at ₹${alternatives[0].price.toLocaleString()} in ${
      alternatives[0].city
    }.\n\nWould you like to see these alternatives, or should I help you adjust your search criteria? 🏠`;
  }

  // No results at all
  if (
    lowerMessage.includes("bhk") ||
    lowerMessage.includes("lakh") ||
    lowerMessage.includes("crore")
  ) {
    return `I apologize, but we don't currently have properties matching your specific requirements. 😔\n\nWould you like to:\n• Adjust your budget range? 💰\n• Try a different BHK configuration? 🏠\n• Explore different locations? 📍\n• See our latest properties?\n\nI can also notify you when matching properties become available! Just let me know your contact details. 📧`;
  }

  // Specific responses based on keywords
  if (lowerMessage.includes("contact") || lowerMessage.includes("dealer")) {
    return "To contact a dealer, click on any property listing and you'll find contact options (call, WhatsApp, email). Our dealers are available to answer all your questions! 📞";
  }

  if (lowerMessage.includes("amenities") || lowerMessage.includes("features")) {
    return "Our properties offer amenities like:\n🅿️ Parking\n🔒 Security\n🏋️ Gym\n🏊 Swimming pool\n🌳 Garden\n⚡ Power backup\n\nEach property has different amenities. Want to search for properties with specific features?";
  }

  if (lowerMessage.includes("process") || lowerMessage.includes("how to")) {
    return "Our property process:\n1️⃣ Browse & shortlist properties\n2️⃣ Contact dealer\n3️⃣ Schedule visit\n4️⃣ Verify documents\n5️⃣ Finalize deal\n\nOur dealers guide you through each step! Need help finding properties? 🏠";
  }

  // Default helpful response
  return "I'm here to help you find your perfect property! 🏠\n\nTry asking:\n• 'Show me 2 BHK under 50 lakh'\n• 'Properties in Mumbai'\n• 'What amenities do you offer?'\n• 'How to contact dealers?'\n\nWhat can I help you with? 😊";
}

module.exports = exports;
