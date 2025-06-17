// FormSections/ContactInfoSection.jsx
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Controller } from "react-hook-form";

export default function ContactInfoSection({ register, errors, control }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-3">
        Thông tin liên hệ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div>
          <label
            htmlFor="customer.phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Số điện thoại di động
          </label>
          <Controller
            control={control}
            name="customer.phoneNumber"
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
                id="customer.phoneNumber"
                placeholder="Nhập số điện thoại của bạn"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.customer?.phoneNumber && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.customer.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="customer.address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ thường trú
          </label>
          <input
            type="text"
            id="customer.address"
            placeholder="Nhập địa chỉ của bạn"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("customer.address", {
              required: "Vui lòng nhập địa chỉ",
            })}
          />
          {errors.customer?.address && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.customer.address.message}
            </p>
          )}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div id="recaptcha" className="flex justify-center mt-2"></div>
    </div>
  );
}
