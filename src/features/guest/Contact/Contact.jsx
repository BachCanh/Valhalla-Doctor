import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import SubHeader from "../../../components/SubHeader";

const Contact = () => {
  return (
    <>
      <SubHeader
        title="Contact us"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."
      />

      <section id="contact" className="mt-5 mb-5">
        <div
          className="max-w-7xl mx-auto px-4"
          style={{ marginTop: 80, marginBottom: 120 }}
        >
          <div className="flex flex-wrap -mx-4">
            {/* Contact Information */}
            <div className="lg:w-1/3 w-full px-4 mb-4 lg:mb-0">
              <div className="bg-gray-50 rounded-lg p-6">
                {/* Location */}
                <div className="flex mb-6 gap-3">
                  <div className="mt-0.5 text-xl text-blue-600 p-2 bg-blue-100 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 ease-in-out">
                    <FaLocationArrow />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 text-slate-700">
                      Location:
                    </h4>
                    <p className="text-sm text-blue-700">
                      number 1, Vo Van Ngan, Thu Duc City, HCM City
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex mb-6 gap-3">
                  <div className="mt-0.5 text-xl text-blue-600 p-2 bg-blue-100 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 ease-in-out">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 text-slate-700">
                      Email:
                    </h4>
                    <p className="text-sm text-blue-700">
                      valhallammed@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex mb-6 gap-3">
                  <div className="mt-0.5 text-xl text-blue-600 p-2 bg-blue-100 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 ease-in-out">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 text-slate-700">
                      Call:
                    </h4>
                    <p className="text-sm text-blue-700">+88 01751 040425</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 w-full px-4">
              <div className="mb-5 p-6 rounded-lg bg-gray-50">
                <form className="flex flex-wrap -mx-2">
                  {/* First Name */}
                  <div className="md:w-1/2 w-full px-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="md:w-1/2 w-full px-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full px-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="w-full px-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your subject"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="w-full px-2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                        cols="30"
                        rows="10"
                        placeholder="enter your message"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="w-full text-center mt-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 border-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="max-w-7xl mx-auto px-4">
          <iframe
            className="w-full h-120 border-0 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
            frameBorder="0"
            allowFullScreen
            title="Contact Location Map"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
