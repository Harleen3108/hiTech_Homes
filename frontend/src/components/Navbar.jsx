import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo1.png";
import { UserAuthContext } from "../context/UserAuthContext";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const { user: regularUser, logout: userLogout } = useContext(UserAuthContext);
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
  ) : regularUser ? (
    <>
      <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {regularUser.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-gray-700">{regularUser.name}</span>
      </div>
      <button
        onClick={() => {
          userLogout();
          handleNavigate("home");
        }}
        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleNavigate("user-login")}
        className="px-6 py-2.5 rounded-lg border-2 border-sky-500 text-sky-600 font-bold hover:bg-sky-50 transition-all"
        style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
      >
        Login
      </button>
      <button
        onClick={() => handleNavigate("user-signup")}
        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
      >
        Sign Up
      </button>
      <button
        onClick={() => handleNavigate("admin-login")}
        className="text-sm text-gray-600 hover:text-sky-600 font-semibold transition-colors"
        style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
      >
        Admin
      </button>
    </>
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

            {regularUser ? (
  <>
    <div className="w-full flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-lg">
      <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {regularUser.name?.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-semibold text-gray-700">{regularUser.name}</span>
    </div>
    <button
      onClick={() => {
        userLogout();
        setMobileMenu(false);
        handleNavigate("home");
      }}
      className="w-full text-left text-base font-semibold text-red-600 hover:text-red-700 transition-colors"
      style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
    >
      Logout
    </button>
  </>
) : (
  <>
    <button
      onClick={() => handleNavigate("user-login")}
      className="w-full text-left text-base font-semibold text-sky-600 hover:text-sky-700 transition-colors"
      style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
    >
      Login
    </button>
    <button
      onClick={() => handleNavigate("user-signup")}
      className="w-full text-left text-base font-semibold text-sky-600 hover:text-sky-700 transition-colors"
      style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
    >
      Sign Up
    </button>
  </>
)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
