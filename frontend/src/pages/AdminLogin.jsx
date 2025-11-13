import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo1.png";

const AdminLogin = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 Attempting login with:", formData.email);
      const data = await login(formData.email, formData.password);

      console.log("📥 Login response:", data);

      if (data.success) {
        console.log("✅ Login successful! Token saved.");
        alert("Login successful!");
        setCurrentPage("admin-dashboard");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={logo}
              alt="Hi-Tech Homes Logo"
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            onClick={() => handleNavigate("home")}
            className="text-gray-600 hover:text-sky-600 font-semibold transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl opacity-40"></div>

        {/* Login Card */}
        <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Left Side - Branding */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-sky-50 to-red-50 p-10 w-1/2">
            <div className="mb-6 transition-transform duration-500 hover:scale-105">
              <img
                src={logo}
                alt="Hi-Tech Homes Logo"
                className="h-32 w-auto object-contain drop-shadow-lg"
              />
            </div>
            <h1
              className="text-4xl font-extrabold text-gray-900 text-center leading-snug"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Hi-Tech <span className="text-sky-600">Homes</span>
            </h1>
            <p
              className="text-gray-500 mt-4 text-center max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Building dreams into reality — manage your listings, enquiries,
              and more from the admin dashboard.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2
              className="text-3xl font-bold text-gray-900 text-center mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Welcome Back
            </h2>
            <p
              className="text-gray-500 text-center mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign in to continue to your dashboard
            </p>

            {error && (
              <div
                className="flex items-center gap-2 p-4 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-xl text-sm font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember Me + Forgot */}
              <div
                className="flex items-center justify-between text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-sky-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sky-600 hover:text-red-500 font-semibold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-sky-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-sky-600 to-red-500 hover:shadow-xl hover:scale-[1.02]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <button
                onClick={() => handleNavigate("home")}
                className="text-sky-600 hover:text-red-500 font-semibold text-sm transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div
                onClick={() => handleNavigate("home")}
                className="flex items-center gap-2 mb-4 cursor-pointer group"
              >
                <img
                  src={logo}
                  alt="Hi-Tech Homes Logo"
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p
                className="text-gray-400 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Building dreams into reality with innovative real estate
                solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="font-bold mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Quick Links
              </h3>
              <ul
                className="space-y-2 text-sm text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <li>
                  <button
                    onClick={() => handleNavigate("home")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("listings")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Properties
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("about")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("contact")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3
                className="font-bold mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Services
              </h3>
              <ul
                className="space-y-2 text-sm text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <li>
                  <button
                    onClick={() => handleNavigate("listings")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Buy Property
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("listings")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Sell Property
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("listings")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Rent Property
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("contact")}
                    className="hover:text-sky-400 transition-colors"
                  >
                    Property Management
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="font-bold mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Contact Us
              </h3>
              <ul
                className="space-y-2 text-sm text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <li>+91 98765 43210</li>
                <li>info@hitechhomes.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>&copy; 2025 Hi-Tech Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
