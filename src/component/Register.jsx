import React, { useContext } from "react";
import { useState } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";


const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Password validation function
  const validatePassword = (pass) => {
    const errors = [];
    if (pass.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(pass)) {
      errors.push("Password must contain an Uppercase letter");
    }
    if (!/[a-z]/.test(pass)) {
      errors.push("Password must contain a Lowercase letter");
    }
    return errors;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate password in real-time
    if (name === "password") {
      if (value.length > 0) {
        setPasswordErrors(validatePassword(value));
      } else {
        setPasswordErrors([]);
      }
    }
  };

  // Show toast notification
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  // Handle email/password signup
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.name.trim()) {
      showToast("Please enter your name", "error");
      return;
    }
    if (!formData.email.trim()) {
      showToast("Please enter your email", "error");
      return;
    }
    if (!formData.photoURL.trim()) {
      showToast("Please enter a photo URL", "error");
      return;
    }
    if (passwordErrors.length > 0) {
      showToast("Please fix password requirements", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(formData.email, formData.password);
      console.log(result);

      // Update user profile with name and photo
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      showToast("✓ Account created successfully!", "success");

      // Reset form
      setFormData({ name: "", email: "", photoURL: "", password: "" });
      setPasswordErrors([]);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        showToast("This email is already registered", "error");
      } else if (error.code === "auth/invalid-email") {
        showToast("Invalid email address", "error");
      } else if (error.code === "auth/weak-password") {
        showToast("Password is too weak", "error");
      } else {
        showToast(
          error.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google signup
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      showToast("Signed up with Google successfully!", "success");

      // Navigate to home
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Google sign-up error:", error);
      showToast(
        error.message || "Google sign-up failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFEFF3] px-4 py-8">
      {/* Toasting notify */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-4 sm:px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 max-w-xs ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white animate-pulse`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3e3e5a] mb-2">
          Create Account 🐾
        </h2>
        <p className="text-sm text-center text-[#3e3e5a]/70 mb-8">
          Join WarmPaws and keep your pets cozy this winter!
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#C1C1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1C1ED] text-[#3e3e5a]"
              required
            />
          </div>

          {/* Email  */}
          <div>
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#C1C1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1C1ED] text-[#3e3e5a]"
              required
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Paste your photo link"
              value={formData.photoURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#C1C1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1C1ED] text-[#3e3e5a]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-[#3e3e5a] ${
                passwordErrors.length > 0 && formData.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#C1C1ED] focus:ring-[#C1C1ED]"
              }`}
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-[#3e3e5a]/70 hover:text-[#3e3e5a]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>

            {/* Password Validation Messages */}
            {passwordErrors.length > 0 && formData.password && (
              <div className="mt-2 space-y-1">
                {passwordErrors.map((error, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-red-500 text-xs"
                  >
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            )}
            {passwordErrors.length === 0 && formData.password && (
              <div className="mt-2 flex items-center gap-2 text-green-500 text-xs">
                <CheckCircle size={14} />
                <span>Password is valid</span>
              </div>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading || passwordErrors.length > 0}
            className="w-full bg-[#C1C1ED] hover:bg-[#b2b2e0] disabled:bg-[#C1C1ED]/50 disabled:cursor-not-allowed text-[#3e3e5a] font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6 text-sm text-[#3e3e5a]/80">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3e3e5a] font-semibold hover:text-[#C1C1ED] transition"
          >
            Login
          </Link>
        </div>

        {/* Google Sign-Up Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#C1C1ED] hover:bg-[#C1C1ED]/20 disabled:opacity-50 disabled:cursor-not-allowed text-[#3e3e5a] font-medium py-2 rounded-lg transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Signing up..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
