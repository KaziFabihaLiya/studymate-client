import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousol = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = ["/Caro1.mp4", "/Caro2.mp4", "/Caro3.mp4"];
  const totalVideos = videos.length;

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalVideos);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalVideos]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalVideos);
  };

  return (
    <div className="relative mt-30 mx-20">
      <div className="carousel w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg relative">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`carousel-item w-full h-full absolute transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              className="w-full h-full object-cover"
              src={video}
              autoPlay
              loop
              muted
            />
          </div>
        ))}

        {/* Left Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Previous video"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Next video"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousol;
