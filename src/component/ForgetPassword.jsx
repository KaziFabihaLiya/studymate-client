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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Redirect to Gmail
      window.open("https://mail.google.com", "_blank");

      toast.success("Opening Gmail. Check your email for password reset link.");

      setLoading(false);

      // Redirect back to login after a moment
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFEFF3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-[#3e3e5a] hover:text-[#C1C1ED] font-semibold mb-6 transition duration-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3e3e5a] mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-center text-[#3e3e5a]/70 mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-3 text-[#C1C1ED]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 pl-10 border-2 border-[#C1C1ED]/30 rounded-lg focus:outline-none focus:border-[#C1C1ED] text-[#3e3e5a] transition duration-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C1C1ED] hover:bg-[#b2b2e0] disabled:bg-[#C1C1ED]/50 disabled:cursor-not-allowed text-[#3e3e5a] font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-[#FFEFF3] rounded-lg">
          <p className="text-xs text-[#3e3e5a]/70 text-center">
            A password reset link will be sent to your email. Check your inbox
            and spam folder.
          </p>
        </div>

        <div className="text-center mt-6 text-sm text-[#3e3e5a]/80">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#3e3e5a] font-semibold hover:text-[#C1C1ED] transition"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
