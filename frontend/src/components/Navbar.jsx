import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo1.png";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Listings", page: "listings" },
    { name: "About", page: "about" },
    { name: "Contact", page: "contact" },
  ];

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ===== LOGO ===== */}
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center cursor-pointer group"
          >
            <img
              src={logo}
              alt="Hi-Tech Homes Logo"
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* ===== DESKTOP NAVIGATION ===== */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <div key={link.page} className="group relative">
                  <button
                    onClick={() => handleNavigate(link.page)}
                    className={`text-base font-semibold tracking-wide transition-all pb-1 ${
                      isActive
                        ? "text-sky-600"
                        : "text-gray-700 hover:text-sky-600"
                    }`}
                    style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                  >
                    {link.name}
                  </button>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-sky-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </div>
              );
            })}
          </div>

          {/* ===== RIGHT SIDE BUTTONS ===== */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("admin-dashboard")}
                  className="text-base font-semibold text-gray-700 hover:text-sky-600 relative group"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("admin-login")}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                Admin Login
              </button>
            )}
          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-gray-700 hover:text-sky-600 focus:outline-none transition-colors"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-t border-sky-100">
          <div className="flex flex-col items-start space-y-3 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`w-full text-left text-base font-semibold transition-colors ${
                    isActive
                      ? "text-sky-600"
                      : "text-gray-700 hover:text-sky-600"
                  }`}
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  {link.name}
                </button>
              );
            })}

            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("admin-dashboard")}
                  className="w-full text-left text-base font-semibold text-gray-700 hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenu(false);
                  }}
                  className="w-full text-left text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("admin-login")}
                className="w-full text-left text-base font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
