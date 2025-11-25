import { useContext, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo1.png";
import { UserAuthContext } from "../context/UserAuthContext";
import AuthModal from "./AuthModal";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const { user: regularUser, logout: userLogout } = useContext(UserAuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

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

  const handleLogout = () => {
    if (user) {
      logout();
    } else if (regularUser) {
      userLogout();
    }
    handleNavigate("home");
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
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
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
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
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent"
                          : "text-gray-700 hover:text-indigo-600"
                      }`}
                      style={{
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                      }}
                    >
                      {link.name}
                    </button>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-300 ${
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
                // Admin logged in
                <>
                  <button
                    onClick={() => handleNavigate("admin-dashboard")}
                    className="text-base font-semibold text-gray-700 hover:text-indigo-600 relative group transition-colors"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : regularUser ? (
                // Regular user logged in
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {regularUser.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {regularUser.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Not logged in - Show single Login button
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-rose-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                >
                  {/* <Sparkles
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  /> */}
                  Login
                </button>
              )}
            </div>

            {/* ===== MOBILE MENU BUTTON ===== */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors p-2 rounded-lg hover:bg-indigo-50"
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ===== MOBILE DROPDOWN MENU ===== */}
        {mobileMenu && (
          <div className="md:hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-lg shadow-2xl border-t border-indigo-100">
            <div className="flex flex-col items-start space-y-3 px-6 py-6">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavigate(link.page)}
                    className={`w-full text-left text-base font-semibold transition-all px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-rose-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600"
                    }`}
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    {link.name}
                  </button>
                );
              })}

              {user ? (
                // Admin logged in
                <>
                  <button
                    onClick={() => {
                      handleNavigate("admin-dashboard");
                      setMobileMenu(false);
                    }}
                    className="w-full text-left text-base font-semibold text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all px-4 py-2 rounded-lg"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                    className="w-full text-left text-base font-semibold text-red-600 hover:bg-red-50 transition-all px-4 py-2 rounded-lg"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : regularUser ? (
                // Regular user logged in
                <>
                  <div className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                      {regularUser.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base font-semibold text-gray-700">
                      {regularUser.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                    className="w-full text-left text-base font-semibold text-red-600 hover:bg-red-50 transition-all px-4 py-2 rounded-lg"
                    style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Not logged in
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenu(false);
                  }}
                  className="w-full text-left text-base font-semibold bg-gradient-to-r from-indigo-500 to-rose-600 text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                >
                  <Sparkles size={16} />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Navbar;
