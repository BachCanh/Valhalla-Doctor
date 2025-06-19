import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import FlexibleSpinner from "../../../components/FlexibleSpinner";
import useGetProfile from "../../../hooks/useGetProfile";
import useEditProfile from "../../../hooks/useEditProfile";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const { profile, isLoadingProfile, isProfileError } = useGetProfile();

  console.log("Profile data:", profile);

  const { updateProfile, isUpdatingProfile } = useEditProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (profile) {
      // Create a valid date object, handling potential invalid dates
      let validDate = null;
      if (profile.dob) {
        const dateObj = new Date(profile.dob);
        // Check if the date is valid
        if (!isNaN(dateObj.getTime())) {
          validDate = dateObj;
        }
      }

      reset({
        fullName: profile.User?.fullname || "",
        email: profile.User?.email || "",
        dateOfBirth: validDate,
        gender: profile.gender || "",
        phoneNumber: profile.User?.phone_number || "",
        address: profile.address || "",
      });
    }
  }, [profile, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "dateOfBirth" && data[key] instanceof Date) {
        formData.append(key, data[key].toISOString());
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center h-64">
        <FlexibleSpinner />
      </div>
    );
  }

  if (isProfileError) {
    return (
      <div className="text-red-600 p-4 text-center">
        Có lỗi xảy ra khi tải thông tin cá nhân.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg hover:scale-105 transform transition-transform duration-300">
          <span className="text-3xl">👤</span>
        </div>
        <h1 className="text-5xl font-bold leading-snug bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
          Thông tin cá nhân
        </h1>
        <p className="text-gray-600 text-lg">
          Quản lý và cập nhật thông tin cá nhân của bạn
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Thông tin chi tiết
          </h2>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-100 text-blue-700 px-4 py-1 rounded-md hover:bg-blue-200 transition"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form về giá trị ban đầu
                  if (profile) {
                    let validDate = null;
                    if (profile.dob) {
                      const dateObj = new Date(profile.dob);
                      if (!isNaN(dateObj.getTime())) {
                        validDate = dateObj;
                      }
                    }
                    reset({
                      fullName: profile.User?.fullname || "",
                      email: profile.User?.email || "",
                      dateOfBirth: validDate,
                      gender: profile.gender || "",
                      phoneNumber: profile.User?.phone_number || "",
                      address: profile.address || "",
                    });
                  }
                }}
                className="bg-gray-100 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-200 transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isUpdatingProfile ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Họ và tên */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-50 text-gray-500"
              }`}
              {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-50 text-gray-500"
              }`}
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày sinh
            </label>
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{ required: "Vui lòng chọn ngày sinh" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  disabled={!isEditing}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  isClearable={isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing
                      ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 text-gray-500"
                  }`}
                />
              )}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  disabled={!isEditing}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  {...register("gender", {
                    required: "Vui lòng chọn giới tính",
                  })}
                />
                <span className="ml-2">Nam</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="fem"
                  disabled={!isEditing}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  {...register("gender", {
                    required: "Vui lòng chọn giới tính",
                  })}
                />
                <span className="ml-2">Nữ</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <Controller
              control={control}
              name="phoneNumber"
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
                  disabled={!isEditing}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing
                      ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 text-gray-500"
                  }`}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <textarea
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-50 text-gray-500"
              }`}
              {...register("address", { required: "Vui lòng nhập địa chỉ" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
