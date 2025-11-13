import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      window.open("https://mail.google.com", "_blank");
      toast.success("Opening Gmail. Check your email for password reset link.");

      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-700 flex items-center justify-center px-4 py-10">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 text-center text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-gray-200 hover:text-white font-medium mb-8 transition duration-300"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Reset Password</h1>
        <p className="text-gray-300 mb-8 text-sm">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-10 py-3 rounded-lg bg-white/10 border border-white/30 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-white transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        {/* Info */}
        <p className="text-gray-400 text-sm mt-6">
          A password reset link will be sent to your email. Check your inbox and
          spam folder.
        </p>

        {/* Login Redirect */}
        <p className="text-gray-300 text-sm mt-6">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
