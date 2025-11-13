import React from "react";
import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-200 to-black flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center max-w-md w-full">
        <div className="text-6xl mb-4">😔</div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Oops!</h1>
        <p className="text-gray-300 mb-8">
          Sorry, something went wrong. The page you're looking for doesn't
          exist.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-400 text-gray-100 font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition"
          >
            <Home size={20} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
