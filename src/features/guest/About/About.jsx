import React from "react";
import HeroSection from "./HeroSection";
import FeatureList from "./FeatureList";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-10">
      {/* Top Section: Hero */}
      <HeroSection />

      {/* Bottom Section: Features Grid */}
      <FeatureList />
    </div>
  );
}

export default About;
