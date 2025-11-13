import { useContext, useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Sparkles, Moon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import * as THREE from "three";
import Swal from "sweetalert2";

export default function Login() {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Three.js Background Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xc0c0c0,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create geometric shapes
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 2, -2);
    scene.add(torus);

    // Add lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    sceneRef.current = { scene, camera, renderer, particlesMesh, torus };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update camera position based on mouse
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.camera.position.x = mousePosition.x * 0.5;
      sceneRef.current.camera.position.y = mousePosition.y * 0.5;
    }
  }, [mousePosition]);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await signInUser(email, password);

    // Ensure valid user object before showing success toast
    if (res && res.user) {
      toast.success("Successfully Logged In!");
      setEmail("");
      setPassword("");
      navigate(location.state?.from?.pathname || "/");
    } else {
      toast.error("Login failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
    if (error.code === "auth/user-not-found") {
      toast.error("Email not found.");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password.");
    } else {
      toast.error("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};



  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        //toast.success("Successfully Logged In!");
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
          draggable: true,
        });
        console.log(res.user);
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
          Swal.fire({
            icon: "error",
            title: "Google sign-in cancelled.",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Google login failed. Please try again.",
            text: "Something went wrong!",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <section className="relative min-h-screen mx-auto overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Three.js Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Animated glow orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-gray-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-gray-400/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative group">
          {/* Animated border glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />

          {/* Main card */}
          <div className=" bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-3xl border border-gray-700/50 my-20 px-20">
            {/* Floating icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-full border border-gray-600 shadow-xl hover:scale-110 transition-transform duration-300">
                  <Moon className="w-8 h-8 text-gray-300" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 animate-shimmer">
                Welcome Back
              </h2>
              <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
            </div>

            <p className="text-sm text-center text-gray-400 mb-8">
              Sign in to continue your journey
            </p>

            <div className="space-y-5">
              {/* Email Input */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-2 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-gray-300 font-medium mb-2 text-sm">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm"
                  required
                />
                <div
                  className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="relative w-full group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-xl blur-sm group-hover/btn:blur transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 disabled:from-gray-800 disabled:to-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-gray-500/50 hover:scale-[1.02] active:scale-[0.98]">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      Logging in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 hover:border-gray-600 disabled:opacity-50 text-gray-200 font-medium py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-gray-700/50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-300 font-semibold hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
