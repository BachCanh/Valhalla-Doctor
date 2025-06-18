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
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin cá nhân
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="patient.fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="patient.fullName"
            placeholder="Nhập họ và tên"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.fullName", {
              required: "Vui lòng nhập họ và tên",
            })}
          />
          {errors.patient?.fullName && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.fullName.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="patient.dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ngày sinh
          </label>
          <Controller
            control={control}
            name="patient.dateOfBirth"
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
                id="patient.dateOfBirth"
                placeholderText="Chọn ngày sinh"
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
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
          {errors.patient?.dateOfBirth && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới tính
          </label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="male"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                {...register("patient.gender", {
                  required: "Vui lòng chọn giới tính",
                })}
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="inline-flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="female"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                {...register("patient.gender", {
                  required: "Vui lòng chọn giới tính",
                })}
              />
              <span className="ml-2">Nữ</span>
            </label>
          </div>
          {errors.patient?.gender && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.gender.message}
            </p>
          )}
        </div>

        {/* National ID */}
        <div>
          <label
            htmlFor="patient.nationalID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CCCD/CMND
          </label>
          <input
            type="text"
            id="patient.nationalID"
            placeholder="Nhập số CCCD hoặc CMND"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.nationalID", {
              required: "Vui lòng nhập CCCD/CMND",
              pattern: {
                value: /^\d{9}$|^\d{12}$/,
                message: "CCCD/CMND phải có 9 hoặc 12 số",
              },
            })}
          />
          {errors.patient?.nationalID && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.nationalID.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
