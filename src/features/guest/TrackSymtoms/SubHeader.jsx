import React from "react";
import bgImage from "/banner.jpg";

const SubHeader = ({ title, subtitle }) => {
  return (
    <section
      className="
        relative w-full
        py-[120px] pb-[70px]
        bg-center bg-cover
        "
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#223a66] opacity-90"></div>
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold uppercase mb-2 drop-shadow-lg">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white m-0 text-lg md:text-xl drop-shadow">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
