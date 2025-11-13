import { useContext, useEffect, useState } from "react";
import {
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Home as HomeIcon,
  Sparkles,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";
import Loader from "../components/Loader";

const Home = ({ setCurrentPage, setSelectedProperty }) => {
  const { properties, loading, fetchProperties } = useContext(PropertyContext);
  const [showStats, setShowStats] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [animateCards, setAnimateCards] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920",
  ];

  useEffect(() => {
    fetchProperties();

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const timeout = setTimeout(() => setShowStats(true), 500);
    const cardsTimeout = setTimeout(() => setAnimateCards(true), 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(cardsTimeout);
    };
  }, []);

  // Get only the most recently uploaded properties (sorted by creation date)
  const featuredProperties = (properties || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div
      className="overflow-hidden bg-gradient-to-b from-sky-50 to-white"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              currentImage === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            }}
          ></div>
        ))}

        {/* Gradient Overlay - Light Blue to Red */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/60 via-sky-500/50 to-red-500/60"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-bounce">
            <Sparkles size={18} className="text-yellow-300" />
            <span className="text-sm font-semibold">
              Premium Properties Await
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight animate-fade-in"
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              animation: "slideUp 0.8s ease-out",
            }}
          >
            Finding Your <span className="text-red-400">Dream Home</span>
            <br />
            Made Simple
          </h1>

          <p className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto drop-shadow-lg font-normal leading-relaxed">
            Experience luxury living with our curated collection of premium
            properties. We transform real estate dreams into reality.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage("listings")}
              className="group px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-2xl hover:shadow-red-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2"
            >
              Explore Properties
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="px-10 py-4 border-3 border-white/90 text-white font-bold rounded-full hover:bg-white hover:text-sky-600 transition-all duration-300 backdrop-blur-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div> */}
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        className={`transition-all duration-1000 ease-out ${
          showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } bg-gradient-to-br from-sky-50 via-white to-red-50 py-20 relative overflow-hidden`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-full lg:w-3/5">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                  alt="Luxury Property"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/50 to-transparent rounded-3xl"></div>
              </div>
            </div>

            <div className="absolute right-0 lg:right-10 bg-white rounded-2xl shadow-2xl p-8 w-80 border-2 border-sky-100 backdrop-blur-sm">
              <div className="space-y-6">
                {[
                  {
                    value: "500+",
                    label: "Properties Sold",
                    icon: <HomeIcon size={24} />,
                    gradient: "from-sky-500 to-sky-500",
                  },
                  {
                    value: "1000+",
                    label: "Happy Clients",
                    icon: <Users size={24} />,
                    gradient: "from-sky-500 to-sky-600",
                  },
                  {
                    value: "50+",
                    label: "Expert Agents",
                    icon: <Award size={24} />,
                    gradient: "from-sky-600 to-sky-500",
                  },
                  {
                    value: "10+",
                    label: "Years Experience",
                    icon: <TrendingUp size={24} />,
                    gradient: "from-sky-600 to-sky-500",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group hover:bg-gradient-to-r hover:from-sky-50 hover:to-red-50 p-4 rounded-xl transition-all duration-300 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`text-5xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className={`bg-gradient-to-br ${stat.gradient} p-2 rounded-lg text-white transform group-hover:scale-110 transition-transform`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-sky-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-sky-100 px-4 py-2 rounded-full mb-3">
              <Sparkles size={16} className="text-red-600" />
              <p className="text-red-600 font-bold uppercase tracking-wider text-sm">
                Premium Selection
              </p>
            </div>

            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-sky-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our handpicked selection of premium homes that redefine
              luxury living
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, idx) => (
                <article
                  key={property._id}
                  onClick={() => {
                    setSelectedProperty(property);
                    setCurrentPage("property-details");
                  }}
                  className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 border-transparent hover:border-sky-200 animate-fade-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        property.images?.[0]?.url ||
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-1 animate-pulse">
                      <Sparkles size={14} />
                      Featured
                    </div>

                    {/* Price on Hover */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full">
                        <span className="text-sky-600 font-bold text-lg">
                          ₹{property.price?.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 text-left">
                    <div
                      className="text-2xl font-extrabold bg-gradient-to-r from-sky-600 to-red-600 bg-clip-text text-transparent mb-2"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      ₹{property.price?.toLocaleString("en-IN")}
                    </div>

                    <h3
                      className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {property.title}
                    </h3>

                    <div className="flex items-center text-gray-500 mb-4 text-sm">
                      <MapPin size={16} className="mr-1 text-red-500" />
                      <span className="font-semibold">{property.city}</span>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-gray-700 bg-gradient-to-r from-sky-50 to-sky-50 rounded-xl p-4 border border-sky-100">
                      <div className="flex flex-col items-center">
                        <div className="bg-sky-100 p-2 rounded-lg mb-1">
                          <Bed size={18} className="text-sky-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {property.bhk} BHK
                        </span>
                      </div>

                      <div className="w-px h-10 bg-gradient-to-b from-sky-200 to-sky-200"></div>

                      <div className="flex flex-col items-center">
                        <div className="bg-sky-100 p-2 rounded-lg mb-1">
                          <Bath size={18} className="text-sky-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {property.bathrooms || 2}
                        </span>
                      </div>

                      <div className="w-px h-10 bg-gradient-to-b from-sky-200 to-red-200"></div>

                      <div className="flex flex-col items-center">
                        <div className="bg-sky-100 p-2 rounded-lg mb-1">
                          <Square size={18} className="text-sky-600" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {property.area || 1200} sqft
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12">
            <button
              onClick={() => setCurrentPage("listings")}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-bold rounded-full shadow-2xl hover:shadow-sky-500/50 hover:scale-110 transition-all duration-300"
            >
              View All Properties
              <ChevronRight
                size={22}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-red-50 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-red-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-red-600 rounded-3xl shadow-2xl p-10 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                    <Sparkles size={16} className="text-yellow-300" />
                    <span className="text-sm font-bold">
                      Limited Time Offer
                    </span>
                  </div>

                  <h2
                    className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Ready to Find Your Perfect Home?
                  </h2>

                  <p className="text-lg mb-8 text-white/95 leading-relaxed">
                    Let our expert team guide you through every step of your
                    real estate journey. Your dream home is just a click away!
                  </p>

                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="group px-8 py-4 bg-white text-sky-600 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
                  >
                    Get Started Today
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-sky-500 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="text-sky-500" size={24} />
                  Decade of Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With over 10 years in the real estate industry, we've helped
                  thousands of families find their dream homes and investment
                  properties.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-sky-500 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Users className="text-red-500" size={24} />
                  Expert Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated professionals bring unparalleled expertise,
                  market knowledge, and commitment to excellence that sets us
                  apart.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-sky-500 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="text-sky-500" size={24} />
                  More Than Transactions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We understand that finding a home is about discovering a place
                  where life's most precious moments will unfold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
