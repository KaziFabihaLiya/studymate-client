import { useContext, useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import * as THREE from "three";

export default function Register() {
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
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xb0b0b0,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const octahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x909090,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(3, -2, -2);
    scene.add(octahedron);

    // Add lighting
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xaaaaaa, 0.8);
    pointLight2.position.set(5, -3, 3);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x303030, 2);
    scene.add(ambientLight);

    sceneRef.current = { scene, camera, renderer, particlesMesh, octahedron };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0003;

      octahedron.rotation.x += 0.008;
      octahedron.rotation.y += 0.012;

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
      sceneRef.current.camera.position.x = mousePosition.x * 0.3;
      sceneRef.current.camera.position.y = mousePosition.y * 0.3;
    }
  }, [mousePosition]);

  // Password validation
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value.length > 0) {
        setPasswordErrors(validatePassword(value));
      } else {
        setPasswordErrors([]);
      }
    }
  };

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const handleRegister = async () => {
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

      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      showToast("✓ Account created successfully!", "success");
      setFormData({ name: "", email: "", photoURL: "", password: "" });
      setPasswordErrors([]);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

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

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      showToast("Signed up with Google successfully!", "success");

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Three.js Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />

      {/* Animated glow orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-radial from-gray-600/30 to-transparent rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-radial from-gray-500/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-900/90 to-green-800/90 border-green-600/50 text-green-100"
                : "bg-gradient-to-r from-red-900/90 to-red-800/90 border-red-600/50 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={22} className="flex-shrink-0" />
            ) : (
              <AlertCircle size={22} className="flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        <div className="relative group">
          {/* Animated border glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/98 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-700/50 my-20 p-20">
            {/* Floating icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-full border border-gray-600 shadow-xl hover:scale-110 transition-transform duration-300">
                  <UserPlus className="w-8 h-8 text-gray-300" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 animate-shimmer">
                Create Account
              </h2>
              <Sparkles className="w-6 h-6 text-gray-400 animate-pulse" />
            </div>

            <p className="text-sm text-center text-gray-400 mb-8">
              Join us and start your journey today
            </p>

            <div className="space-y-4">
              {/* Name Input */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-2 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Photo URL Input */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-2 text-sm">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="Paste your photo link"
                  value={formData.photoURL}
                  onChange={handleInputChange}
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
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-500 transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm ${
                    passwordErrors.length > 0 && formData.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-gray-500"
                  }`}
                  required
                />
                <div
                  className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>

                {/* Password Validation */}
                {passwordErrors.length > 0 && formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordErrors.map((error, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-red-400 text-xs"
                      >
                        <AlertCircle size={14} />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                )}
                {passwordErrors.length === 0 && formData.password && (
                  <div className="mt-2 flex items-center gap-2 text-green-400 text-xs">
                    <CheckCircle size={14} />
                    <span>Password is valid</span>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={loading || passwordErrors.length > 0}
                className="relative w-full group/btn overflow-hidden mt-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-xl blur-sm group-hover/btn:blur transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 disabled:from-gray-800 disabled:to-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-gray-500/50 hover:scale-[1.02] active:scale-[0.98]">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
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

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 hover:border-gray-600 disabled:opacity-50 text-gray-200 font-medium py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-gray-700/50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {loading ? "Signing up..." : "Continue with Google"}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gray-300 font-semibold hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
