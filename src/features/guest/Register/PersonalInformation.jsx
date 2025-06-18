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
            className="block text-md font-medium text-gray-800 mb-2"
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.patient?.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.patient.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="patient.address"
            className="block text-md font-medium text-gray-800 mb-2"
          >
            Địa chỉ thường trú
          </label>
          <input
            type="text"
            id="patient.address"
            placeholder="Nhập địa chỉ của bạn"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
            {...register("patient.address", {
              required: "Vui lòng nhập địa chỉ",
            })}
          />
          {errors.patient?.address && (
            <p className="mt-1 text-sm text-red-500">
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
