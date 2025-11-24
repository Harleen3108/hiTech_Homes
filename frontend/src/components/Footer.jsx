import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../assets/logo1.png";

export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-300 text-gray-900 pt-16 pb-8 mt-20 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* ===== BRAND SECTION ===== */}
        <div>
          <div
            onClick={() => handleNavigate("home")}
            className="mb-4 cursor-pointer hover:scale-[1.02] transition-all inline-block"
          >
            <img
              src={logo}
              alt="Hi-Tech Homes Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p
            className="text-gray-600 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Building dreams into reality. Explore premium properties designed
            for comfort, style, and innovation — where luxury meets lifestyle.
          </p>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Quick Links
          </h3>
          <ul
            className="space-y-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {[
              { label: "Home", page: "home" },
              { label: "Listings", page: "listings" },
              { label: "About", page: "about" },
              { label: "Contact", page: "contact" },
            ].map((link) => (
              <li key={link.page}>
                <button
                  onClick={() => handleNavigate(link.page)}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CONTACT INFO ===== */}
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Contact Us
          </h3>
          <ul
            className="space-y-3 text-gray-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-600" />
              123 Skyline Avenue, Mumbai, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-600" />
              info@hitechhomes.com
            </li>
          </ul>
        </div>

        {/* ===== LEGAL & SOCIAL ===== */}
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Legal
          </h3>
          <ul
            className="space-y-2 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <li>
              <button
                onClick={() => handleNavigate("privacy-policy")}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate("terms-conditions")}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>

          <h3
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            {[
              { Icon: Facebook, link: "#" },
              { Icon: Instagram, link: "#" },
              { Icon: Twitter, link: "#" },
            ].map(({ Icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                className="p-2.5 rounded-full border border-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DIVIDER / COPYRIGHT ===== */}
      <div
        className="border-t border-gray-300 mt-12 pt-6 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-sm text-gray-600 mb-2">
          © {currentYear}{" "}
          <span className="font-semibold text-gray-800">
            Anukul Infosystems India LLP
          </span>
          . All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Powered by{" "}
          <span className="font-medium text-gray-700">Hi-Tech Homes</span>
        </p>
      </div>
    </footer>
  );
}
