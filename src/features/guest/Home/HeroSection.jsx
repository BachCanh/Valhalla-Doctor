import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full min-h-[80vh] flex items-center justify-center
        bg-[url('../../../images/img/hero-bg.jpg')] bg-center bg-cover
      "
      style={{
        backgroundAttachment: window.innerWidth >= 1024 ? "fixed" : "scroll",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1977cc]/70"></div>
      <div className="relative z-10 max-w-2xl mx-auto text-center text-white px-6 py-12 rounded-lg shadow-xl bg-white/10 backdrop-blur-md">
        <small className="block text-lg font-semibold tracking-widest mb-3 text-[#e3f0fc]">
          TOTAL HEALTH CARE SOLUTION
        </small>
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase mb-4 leading-tight drop-shadow-lg">
          Your Most Trusted <br />
          Health Partner
        </h1>
        <p className="text-lg md:text-xl font-medium mb-8 text-[#e3f0fc]">
          A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium
          quisquam aperiam maiores sunt fugit, deserunt rem suscipit placeat.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/appointment"
            className="
              uppercase font-bold text-sm md:text-base px-8 py-3 rounded-full
              bg-gradient-to-r from-[#1977cc] to-[#3291e6]
              shadow-lg hover:scale-105 transition-all duration-300
              hover:bg-[#1977cc] hover:text-white
              "
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
