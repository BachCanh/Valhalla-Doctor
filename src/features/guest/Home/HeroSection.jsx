import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full min-h-[80vh] flex items-center justify-center bg-[#1977cc]/70
        bg-[url('../hero-bg.jpg')] bg-center bg-cover 
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>
      <div className="container mx-auto px-4 relative pb-0 lg:pb-16">
        <div className="mb-8">
          <small className="text-sm text-gray-600 block mb-4">
            GIẢI PHÁP CHĂM SÓC SỨC KHỎE TOÀN DIỆN
          </small>
          <h1 className="m-0 text-2xl sm:text-3xl lg:text-5xl font-bold leading-9 sm:leading-10 lg:leading-[56px] uppercase text-[#2c4964] mb-4">
            Đối Tác Sức Khỏe <br />
            Đáng Tin Cậy Nhất
          </h1>
          <small className="text-sm text-gray-600 block leading-relaxed">
            Nền tảng khám bệnh online hiện đại, kết nối bạn với các bác sĩ
            chuyên khoa hàng đầu.
            <br /> Tư vấn sức khỏe 24/7, đặt lịch khám dễ dàng, theo dõi sức
            khỏe thông minh ngay tại nhà.
          </small>
        </div>
        <div className="flex justify-start gap-2 flex-wrap">
          <Link
            to={"/appointment"}
            className="inline-block font-['Raleway',sans-serif] uppercase font-medium text-xs sm:text-sm tracking-wider px-2.5 sm:px-9 py-2 sm:py-3 mt-7 rounded-full transition-all duration-500 text-white bg-[#1977cc] hover:bg-[#3291e6] no-underline"
          >
            Bắt Đầu Ngay
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
