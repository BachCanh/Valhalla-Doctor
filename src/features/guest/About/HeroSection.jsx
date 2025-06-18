import React from "react";
import HeroImage from "./HeroImage";

function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="lg:w-1/2 lg:pr-10 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Đặt lịch khám bệnh thông minh
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Chúng tôi giúp bạn dễ dàng đặt lịch hẹn với bác sĩ phù hợp nhất cho
          các triệu chứng của bạn, tiết kiệm thời gian và chi phí.
        </p>
      </div>

      <HeroImage />
    </div>
  );
}

export default HeroSection;
