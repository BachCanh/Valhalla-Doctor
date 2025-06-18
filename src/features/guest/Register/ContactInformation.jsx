// FormSections/ContactInfoSection.jsx
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Controller } from "react-hook-form";

function ContactInfoSection({ register, errors, control }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-8 border border-gray-100">
      {/* Section Title */}
      <div className="flex items-center space-x-3">
        <div className="h-6 w-1.5 bg-blue-600 rounded-sm" />
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin liên hệ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div>
          <label
            htmlFor="patient.phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Số điện thoại di động
          </label>
          <Controller
            control={control}
            name="patient.phoneNumber"
            rules={{
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            render={({ field }) => (
              <PhoneInput
                international
                defaultCountry="VN"
                id="patient.phoneNumber"
                placeholder="Nhập số điện thoại của bạn"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.patient?.phoneNumber && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="patient.address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ thường trú
          </label>
          <input
            type="text"
            id="patient.address"
            placeholder="Nhập địa chỉ của bạn"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.address", {
              required: "Vui lòng nhập địa chỉ",
            })}
          />
          {errors.patient?.address && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.address.message}
            </p>
          )}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div id="recaptcha" className="flex justify-center pt-4">
        {/* reCAPTCHA will render here */}
      </div>
    </div>
  );
}

export default ContactInfoSection;
