import DoctorCard from "./DoctorCard";
import useGetDoctorsWithDepartmentId from "../../../hooks/useGetDoctorsWithDepartmentId";
import { useParams } from "react-router-dom";

function Doctors() {
  const { departmentId } = useParams();

  const {
    doctors: listDoctors = [],
    isLoading,
    isError,
    error,
  } = useGetDoctorsWithDepartmentId(departmentId);

  if (isLoading) {
    return <div className="text-center py-10">Loading doctors...</div>;
  }

  if (isError) {
    if (error.message === "No doctors found for this department.") {
      return (
        <div className="font-sans p-4">
          <div className="w-4/5 mx-auto">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-gray-600 bg-gray-50 rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h4 className="text-xl font-medium mb-2">
                Không tìm thấy bác sĩ nào
              </h4>
              <p className="text-gray-500 text-center max-w-md">
                Hiện tại không có bác sĩ nào trong khoa này hoặc phù hợp với
                tiêu chí tìm kiếm của bạn.
              </p>
              <p className="text-gray-500 text-center mt-1">
                Vui lòng thử lại với một khoa khác hoặc liên hệ với chúng tôi để
                được hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  console.log("Doctors list:", listDoctors);

  return (
    <div className="font-sans p-4">
      <div className="w-4/5 mx-auto">
        <h3 className="text-lg font-semibold mb-4">
          Tìm thấy {listDoctors?.length || 0} kết quả.
        </h3>
        {listDoctors && listDoctors.length > 0 ? (
          listDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.User.fullname}
              department={doctor.Department.name}
              email={doctor.User.email}
              phone={doctor.User.phone_number}
              bio={doctor.bio}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-gray-600 bg-gray-50 rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h4 className="text-xl font-medium mb-2">
              Không tìm thấy bác sĩ nào
            </h4>
            <p className="text-gray-500 text-center max-w-md">
              Hiện tại không có bác sĩ nào trong khoa này hoặc phù hợp với tiêu
              chí tìm kiếm của bạn.
            </p>
            <p className="text-gray-500 text-center mt-1">
              Vui lòng thử lại với một khoa khác hoặc liên hệ với chúng tôi để
              được hỗ trợ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
