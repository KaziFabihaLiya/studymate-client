import React from "react";

const Homepage = () => {
  return (
    <div className="relative mt-30 mx-20">
      {" "}
      {/* Add margin-top to avoid navbar overlap */}
      <div className="carousel w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg">
        <div className="carousel-item w-full">
          <video
            className="w-full h-full object-cover"
            src="/Caro1.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="carousel-item w-full">
          <video
            className="w-full h-full object-cover"
            src="/Caro2.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="carousel-item w-full">
          <video
            className="w-full h-full object-cover"
            src="/Caro3.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
