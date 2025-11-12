import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";

export default function Login() {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formEmail = e.target.email.value;
    const pass = e.target.password.value;

    setLoading(true);
    signInUser(formEmail, pass)
      .then((res) => {
        console.log(res.user);
        toast.success("Successfully Logged In!");
        e.target.reset();
        setEmail("");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          toast.error("Email not found");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        toast.success("Successfully Logged In!");
        console.log(res.user);
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Google sign-in cancelled.");
        } else {
          toast.error("Google login failed. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleForgotPasswordClick = () => {
    // Pass email to forgot password page
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFEFF3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3e3e5a] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-[#3e3e5a]/70 mb-8">
          Login to continue caring for your furry friends.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#C1C1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1C1ED] text-[#3e3e5a]"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-[#3e3e5a] font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-[#C1C1ED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1C1ED] text-[#3e3e5a]"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-[#3e3e5a]/70 hover:text-[#3e3e5a]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-sm text-[#3e3e5a]/70 hover:text-[#C1C1ED] transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C1C1ED] hover:bg-[#b2b2e0] disabled:bg-[#C1C1ED]/50 text-[#3e3e5a] font-semibold py-2 rounded-lg transition duration-300 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-[#3e3e5a]/80">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#3e3e5a] font-semibold hover:text-[#C1C1ED] transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-[#C1C1ED] hover:bg-[#C1C1ED]/20 disabled:opacity-50 text-[#3e3e5a] font-medium py-2 rounded-lg transition duration-300 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </section>
  );
}
