import React from "react";
import { FaClock, FaHeadset, FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <section className="mt-5 md:mt-0">
      <div className="container mx-auto px-4 my-10">
        {/* Tiêu đề phần */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Thông Tin Của Chúng Tôi
          </h2>
          <p className="m-0 text-gray-600 text-lg">
            Chúng tôi cung cấp dịch vụ chăm sóc sức khỏe toàn diện và chuyên
            nghiệp.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cột trái - Tại sao chọn chúng tôi */}
          <div className="lg:w-1/3 flex">
            <div className="p-8 bg-[#1977cc] rounded text-white w-full">
              <h3 className="font-bold text-3xl lg:text-[34px] mb-8 text-white">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <p className="mb-8 leading-relaxed">
                Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao với đội
                ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại. Sự hài
                lòng và sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.
              </p>
              <div className="text-center">
                <Link
                  to="/"
                  className="inline-block bg-white/20 px-8 py-2 text-white rounded-full transition-all duration-400 ease-in-out hover:text-[#1977cc] hover:bg-white no-underline"
                >
                  Tìm Hiểu Thêm{" "}
                  <i className="bx bx-chevron-right text-sm ml-1"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Cột phải - Hộp biểu tượng */}
          <div className="lg:w-2/3 flex">
            <div className="flex flex-col justify-center w-full">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Đặt lịch hẹn */}
                <div className="flex">
                  <div className="text-center rounded-lg bg-white shadow-[0px_2px_15px_rgba(0,0,0,0.1)] py-10 px-8 w-full mt-4 xl:mt-0">
                    <FaHouseUser className="text-4xl text-[#1977cc] mb-8 mx-auto" />
                    <h4 className="text-xl font-bold mb-8 text-[#2c4964]">
                      Đặt Lịch Hẹn
                    </h4>
                    <small className="text-gray-500 block mb-4">
                      Dịch Vụ 24 Giờ
                    </small>
                    <p className="text-[15px] text-[#848484] leading-relaxed">
                      Đặt lịch hẹn dễ dàng và nhanh chóng với các bác sĩ chuyên
                      khoa của chúng tôi mọi lúc mọi nơi.
                    </p>
                  </div>
                </div>

                {/* Trường hợp khẩn cấp */}
                <div className="flex">
                  <div className="text-center rounded-lg bg-white shadow-[0px_2px_15px_rgba(0,0,0,0.1)] py-10 px-8 w-full mt-4 xl:mt-0">
                    <FaHeadset className="text-4xl text-[#1977cc] mb-8 mx-auto" />
                    <h4 className="text-xl font-bold mb-4 text-[#2c4964]">
                      Trường Hợp Khẩn Cấp
                    </h4>
                    <h6 className="text-gray-500 text-base mb-6">
                      +88 01751 040425
                    </h6>
                    <p className="text-[15px] text-[#848484] leading-relaxed">
                      Đội ngũ y tế của chúng tôi sẵn sàng hỗ trợ bạn trong những
                      tình huống khẩn cấp với dịch vụ tư vấn và cấp cứu chuyên
                      nghiệp.
                    </p>
                  </div>
                </div>

                {/* Giờ làm việc */}
                <div className="flex">
                  <div className="text-center rounded-lg bg-white shadow-[0px_2px_15px_rgba(0,0,0,0.1)] py-10 px-8 w-full mt-4 xl:mt-0">
                    <FaClock className="text-4xl text-[#1977cc] mb-8 mx-auto" />
                    <h4 className="text-xl font-bold mb-4 text-[#2c4964]">
                      Giờ Làm Việc
                    </h4>
                    <small className="text-gray-500 block mb-6">
                      Lịch trình thời gian
                    </small>
                    <div className="text-left">
                      <div className="border-b border-gray-200 py-2 flex justify-between items-center whitespace-nowrap">
                        <p className="mb-0">Mon - Wed :</p>
                        <p className="mb-0">8:00 - 17:00</p>
                      </div>
                      <div className="border-b border-gray-200 py-2 flex justify-between items-center whitespace-nowrap">
                        <p className="mb-0">Thur - Fri :</p>
                        <p className="mb-0">9:00 - 17:00</p>
                      </div>
                      <div className="py-2 flex justify-between items-center whitespace-nowrap">
                        <p className="mb-0">Sat - Sun :</p>
                        <p className="mb-0">10:00 - 17:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPage;
