import React, { useState, use, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  User,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Save,
  Sparkles,
  Monitor,
  Users,
  Home,
  Coffee,
  GraduationCap,
  Target,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../Auth/AuthContext";
import toast from "react-hot-toast";

const CreateProfile = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: user?.email || "",
    profileimage: "",
    subject: "",
    subjects: [],
    skills: [],
    studyMode: "",
    experienceLevel: "",
    availabilityTime: "",
    location: "",
    bio: "",
    achievements: [],
    languages: [],
    responseTime: "",
    successRate: "",
    rating: 0,
    partnerCount: 0,
    goals: "",
    availability: [],
    preferredStudyTime: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Predefined options
  const subjectOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Economics",
    "Psychology",
    "Statistics",
    "Engineering",
    "Business",
  ];

  const studyModeOptions = [
    { value: "Online", label: "Online", icon: Monitor },
    { value: "Offline", label: "Offline", icon: Users },
    { value: "Hybrid", label: "Hybrid", icon: Home },
  ];

  const experienceLevelOptions = [
    {
      value: "Beginner",
      label: "Beginner",
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
      icon: Award,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "Advanced",
      label: "Advanced",
      icon: Target,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "Expert",
      label: "Expert",
      icon: Sparkles,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const availabilityOptions = [
    "Monday Morning",
    "Monday Afternoon",
    "Monday Evening",
    "Tuesday Morning",
    "Tuesday Afternoon",
    "Tuesday Evening",
    "Wednesday Morning",
    "Wednesday Afternoon",
    "Wednesday Evening",
    "Thursday Morning",
    "Thursday Afternoon",
    "Thursday Evening",
    "Friday Morning",
    "Friday Afternoon",
    "Friday Evening",
    "Weekend Morning",
    "Weekend Afternoon",
    "Weekend Evening",
  ];

  const studyTimeOptions = [
    {
      value: "Morning 8-11 AM",
      label: "Morning (8-11 AM)",
      icon: Coffee,
    },
    { value: "Afternoon 2-5 PM", label: "Afternoon (2-5 PM)", icon: Clock },
    { value: "Evening 6-9 PM", label: "Evening (6-9 PM)", icon: Clock },
    { value: "Night 9-11 PM", label: "Night (9-11 PM)", icon: Clock },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData((prev) => {
      const updatedSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return {
        ...prev,
        subjects: updatedSubjects,
        subject: updatedSubjects[0] || "",
      };
    });
  };

  const handleSkillAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const skill = e.target.value.trim();
      if (!formData.skills.includes(skill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skill],
        }));
      }
      e.target.value = "";
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAvailabilityToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.subjects.length ||
      !formData.studyMode ||
      !formData.experienceLevel
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      // Map preferredStudyTime to availabilityTime
      const submitData = {
        ...formData,
        availabilityTime: formData.preferredStudyTime || "",
      };

      // Send as JSON
      const response = await fetch("http://localhost:5000/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Profile created Successfully");
        console.log("Profile created:", result);
        setSuccess(true);
        setTimeout(() => {
          navigate("/my-profiles");
        }, 2000);
      } else {
        toast.error("Failed to create profile");
        throw new Error("Failed to create profile");
      }
    } catch (err) {
      setError(err.message || "Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
            <Sparkles className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Build Your Profile
            </span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent mb-4">
            Create Partner Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your academic interests and connect with like-minded study
            partners
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={2.5} />
            <div>
              <p className="text-green-800 font-semibold">
                Profile created successfully!
              </p>
              <p className="text-green-700 text-sm">
                Redirecting to your profile...
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600" strokeWidth={2.5} />
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="space-y-6">
              {/* Profile Image URL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Profile Picture URL
                </label>
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    {formData.profileimage ? (
                      <img
                        src={formData.profileimage}
                        alt="Preview"
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-200 shadow-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center border-4 border-gray-200 ${
                        formData.profileimage ? "hidden" : ""
                      }`}
                    >
                      <User
                        className="w-16 h-16 text-gray-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="url"
                      name="profileimage"
                      value={formData.profileimage}
                      onChange={handleInputChange}
                      placeholder="https://example.com/your-image.jpg"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Provide a direct URL to your profile image (e.g., from
                      ImgBB or Unsplash).
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    strokeWidth={2.5}
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State or Country"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Academic Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* Subjects */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Subjects <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {subjectOptions.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle(subject)}
                      className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        formData.subjects.includes(subject)
                          ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Skills & Expertise
                </label>
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  onKeyDown={handleSkillAdd}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 rounded-full text-sm font-semibold text-gray-700"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {experienceLevelOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            experienceLevel: option.value,
                          }))
                        }
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          formData.experienceLevel === option.value
                            ? "border-gray-700 bg-gray-50 shadow-lg scale-105"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                        >
                          <Icon
                            className="w-6 h-6 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Study Preferences Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Study Preferences
              </h2>
            </div>

            <div className="space-y-6">
              {/* Study Mode */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Study Mode <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studyModeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            studyMode: option.value,
                          }))
                        }
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          formData.studyMode === option.value
                            ? "border-gray-700 bg-gray-50 shadow-lg scale-105"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <Icon
                          className="w-8 h-8 text-gray-700 mx-auto mb-3"
                          strokeWidth={2.5}
                        />
                        <p className="text-sm font-bold text-gray-900">
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Study Time */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Preferred Study Time
                </label>
                <div className="space-y-2">
                  {studyTimeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredStudyTime: option.value,
                          }))
                        }
                        className={`w-full flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.preferredStudyTime === option.value
                            ? "border-gray-700 bg-gray-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon
                            className="w-5 h-5 text-gray-700"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Availability
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availabilityOptions.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleAvailabilityToggle(day)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        formData.availability.includes(day)
                          ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Additional Information
              </h2>
            </div>

            <div className="space-y-6">
              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell others about yourself, your study style, and what you're looking for in a study partner..."
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Academic Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="What are your academic goals? What do you hope to achieve with a study partner?"
                  rows="3"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="group relative px-12 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-2xl shadow-2xl hover:shadow-gray-500/50 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center space-x-3">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" strokeWidth={2.5} />
                    <span>Create Profile</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
