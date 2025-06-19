import React from "react";
import logo from "/favicon.png";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#15558d]">
      {/* Footer Top */}
      <div className="py-10">
        <div className="container-fluid px-4 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logo & About Section */}
            <div className="col-span-1">
              <div className="footer-widget">
                <div className="mb-8">
                  <Link
                    to={"/"}
                    className="no-underline border-0 border-solid radius-0"
                  >
                    <div className="bg-white rounded-full p-2 w-fit">
                      <img
                        src={logo}
                        alt="logo"
                        className="max-w-[160px] h-auto"
                      />
                    </div>
                  </Link>
                </div>
                <div>
                  <p className="text-white text-sm leading-relaxed max-w-[200px] mb-0">
                    Bệnh viện chúng tôi luôn cam kết mang đến dịch vụ y tế chất
                    lượng cao, đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị
                    hiện đại nhằm chăm sóc sức khỏe toàn diện cho cộng đồng.
                  </p>
                </div>
              </div>
            </div>

            {/* For Patients Menu */}
            <div className="col-span-1">
              <div className="footer-widget">
                <h2 className="text-white text-xl font-bold mb-8 capitalize">
                  Bệnh nhân
                </h2>
                <ul className="list-none m-0 p-0 space-y-2.5">
                  <li>
                    <Link
                      to={"/login"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Đăng nhập
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/register"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Đăng ký
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/appointment"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Tìm kiếm khoa
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Doctors Menu */}
            <div className="col-span-1">
              <div className="footer-widget">
                <h2 className="text-white text-xl font-bold mb-8 capitalize">
                  Bác sĩ
                </h2>
                <ul className="list-none m-0 p-0 space-y-2.5">
                  <li>
                    <Link
                      to={"/login"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Register
                    </Link>
                  </li>
                  <li className="mb-0">
                    <Link
                      to={"/dashboard"}
                      className="text-white text-[15px] no-underline transition-all duration-400 ease-in-out hover:text-white hover:tracking-wider hover:pl-2.5 flex items-center"
                    >
                      <FaAngleDoubleRight className="mr-1.5 text-sm" />
                      Doctor Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="col-span-1">
              <div className="footer-widget">
                <h2 className="text-white text-xl font-bold mb-8 capitalize mt-3 md:mt-0">
                  Liên hệ
                </h2>
                <div className="text-white text-[15px]">
                  <div className="flex mb-4">
                    <span className="mr-5">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </span>
                    <p className="mb-0">
                      số 1, Võ Văn Ngân, Thủ Đức
                      <br />
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                  <p className="mb-4">
                    <i className="fas fa-phone-alt mr-4"></i>
                    +88 018 52 034229
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-envelope mr-4"></i>
                    vahallammed@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#1663a6] py-8">
        <div className="container-fluid px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <div>
                <div className="mb-0 text-white text-[15px]">
                  <div className="text-center">
                    <p className="text-white">
                      Copyright {new Date().getFullYear()} All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div>
                <div className="flex gap-2 justify-center">
                  <p className="text-white no-underline hover:text-[#09e5ab] transition-all duration-400">
                    Terms and Conditions
                  </p>
                  <p className="text-white no-underline hover:text-[#09e5ab] transition-all duration-400">
                    Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
