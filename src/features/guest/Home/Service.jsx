import React from "react";
import img from "/doc1.jpg";
import img2 from "/doc4.jpg";
import img3 from "/doc5.jpg";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <section className="container mx-auto px-4 my-10">
      {/* Tiêu đề phần */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Dịch Vụ
        </h2>
        <p className="m-0 text-gray-600 text-lg">
          Chúng tôi cung cấp các dịch vụ y tế chuyên nghiệp và toàn diện.
        </p>
      </div>

      {/* Lưới nội dung */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Cột hình ảnh đầu tiên */}
        <div className="lg:col-span-4 sm:col-span-6">
          <div className="space-y-4">
            <img
              src={img}
              alt="Bác sĩ chuyên khoa"
              className="w-full h-auto rounded-md shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)]"
            />
            <img
              src={img2}
              alt="Dịch vụ y tế chất lượng"
              className="w-full h-auto rounded-md shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)]"
            />
          </div>
        </div>

        {/* Cột hình ảnh thứ hai */}
        <div className="lg:col-span-4 sm:col-span-6 mt-4 lg:mt-0">
          <div>
            <img
              src={img3}
              alt="Chăm sóc sức khỏe toàn diện"
              className="w-full h-auto rounded-md shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)]"
            />
          </div>
        </div>

        {/* Cột nội dung */}
        <div className="lg:col-span-4 lg:pl-6 mt-4 lg:mt-0">
          <div>
            <h2 className="text-[#223a66] text-3xl lg:text-[44px] font-bold leading-tight mb-6">
              Chăm sóc cá nhân <br />
              Sống khỏe mạnh
            </h2>
            <p className="mt-4 mb-8 text-gray-500 text-base leading-relaxed">
              Chúng tôi cung cấp dịch vụ y tế hàng đầu với đội ngũ bác sĩ giàu
              kinh nghiệm và trang thiết bị hiện đại, cam kết mang đến sự chăm
              sóc tốt nhất cho sức khỏe của bạn.
            </p>
            <Link
              to={"/appointment"}
              className="inline-block font-['Raleway',sans-serif] uppercase font-medium text-sm tracking-wider px-9 py-3 rounded-full transition-all duration-500 text-white bg-[#1977cc] hover:bg-[#3291e6] no-underline"
            >
              Dịch Vụ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
