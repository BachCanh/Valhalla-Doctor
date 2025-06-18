import React from "react";

function HeroImage() {
  return (
    <div className="lg:w-1/2 flex justify-center">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        {/* Blue background circle */}
        <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-[352px] h-[352px] sm:w-[432px] sm:h-[432px] bg-blue-500 rounded-full"></div>

        {/* Main image with circular mask */}
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/medium-shot-scientists-posing-together_23-2148969982.jpg"
            alt="Doctor examining a patient"
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[20%] -right-3 sm:-right-5 w-4 h-4 bg-purple-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] -right-10 sm:-right-14 w-16 h-16 border-2 border-yellow-300 rounded-full"></div>
        <span className="absolute top-[65%] -left-4 sm:-left-6 text-2xl font-bold text-green-400">
          +
        </span>
        <span className="absolute bottom-2 right-1/2 text-3xl font-bold text-green-400">
          +
        </span>
      </div>
    </div>
  );
}

export default HeroImage;
