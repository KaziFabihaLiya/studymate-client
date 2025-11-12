import React from "react";
import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFEFF3] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center max-w-md w-full">
        <div className="text-6xl mb-4">😔</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#3e3e5a] mb-3">
          Oops!
        </h1>
        <p className="text-[#3e3e5a]/70 mb-8">
          Sorry, something went wrong. The page you're looking for doesn't
          exist.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#C1C1ED] text-[#3e3e5a] font-semibold rounded-lg hover:bg-[#FFEFF3] transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C1C1ED] hover:bg-[#b2b2e0] text-[#3e3e5a] font-semibold rounded-lg transition"
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
