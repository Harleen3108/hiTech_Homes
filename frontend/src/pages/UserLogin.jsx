import { useState, useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";
import { Mail, Lock, ArrowRight, Home, Sparkles } from "lucide-react";

const UserLogin = ({ setCurrentPage }) => {
  const { login } = useContext(UserAuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setCurrentPage("home");
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl mb-4 shadow-lg">
            <Home size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Welcome Back
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
            Login to explore amazing properties
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-sky-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all text-gray-900 font-medium bg-gray-50 focus:bg-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                loading
                  ? "bg-sky-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 hover:shadow-xl hover:scale-[1.02]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Don't have an account?{" "}
              <button
                onClick={() => setCurrentPage("user-signup")}
                className="text-sky-600 font-semibold hover:text-sky-700 hover:underline transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-gray-600 hover:text-sky-600 font-semibold text-sm transition-colors inline-flex items-center gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;