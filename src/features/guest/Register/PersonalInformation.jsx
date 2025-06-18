// FormSections/PersonalInfoSection.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export default function PersonalInfoSection({ register, errors, control }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-8 border border-gray-100">
      {/* Section Heading */}
      <div className="flex items-center space-x-3">
        <div className="h-6 w-1.5 bg-blue-600 rounded-sm" />
        <h2 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="customer.fullName"
            className="block text-md font-medium text-gray-800 mb-2"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="customer.fullName"
            placeholder="Nhập họ và tên"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
            {...register("customer.fullName", {
              required: "Vui lòng nhập họ và tên",
            })}
          />
          {errors.customer?.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customer.fullName.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="customer.dateOfBirth"
            className="block text-md font-medium text-gray-800 mb-2"
          >
            Ngày sinh
          </label>
          <Controller
            control={control}
            name="customer.dateOfBirth"
            rules={{
              required: "Vui lòng chọn ngày sinh",
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const hasHadBirthday =
                  today.getMonth() > birthDate.getMonth() ||
                  (today.getMonth() === birthDate.getMonth() &&
                    today.getDate() >= birthDate.getDate());
                const finalAge = hasHadBirthday ? age : age - 1;
                return finalAge >= 18 || "Bạn phải đủ 18 tuổi trở lên";
              },
            }}
            render={({ field }) => (
              <DatePicker
                id="customer.dateOfBirth"
                placeholderText="Chọn ngày sinh"
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                onBlur={field.onBlur}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
              />
            )}
          />
          {errors.customer?.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customer.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-md font-medium text-gray-800 mb-2">
            Giới tính
          </label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="male"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                {...register("customer.gender", {
                  required: "Vui lòng chọn giới tính",
                })}
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="inline-flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="female"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                {...register("customer.gender", {
                  required: "Vui lòng chọn giới tính",
                })}
              />
              <span className="ml-2">Nữ</span>
            </label>
          </div>
          {errors.customer?.gender && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customer.gender.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
