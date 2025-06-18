import React, { useState } from "react";
import DoctorCard from "./DoctorCard";
import useGetDoctorsWithDepartmentId from "../../../hooks/useGetDoctorsWithDepartmentId";
import { useParams } from "react-router-dom";
import SubHeader from "../TrackSymptoms/SubHeader";
import Pagination from "./Pagination";

function Doctors() {
  const { departmentId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 4;

  const {
    doctors: listDoctors = [],
    isLoading,
    isError,
    error,
  } = useGetDoctorsWithDepartmentId(departmentId);

  // Calculate pagination values
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = listDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(listDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Mong bạn kiên nhẫn trong giây lát...
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching doctors:", error);
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
              {error.message || "Đã xảy ra lỗi khi tải danh sách bác sĩ"}
            </h4>
            {error.message == "Không có bác sĩ tìm thấy cho bộ phận này." && (
              <div>
                <p className="text-gray-500 text-center max-w-md">
                  Hiện tại không có bác sĩ nào trong khoa này hoặc phù hợp với
                  tiêu chí tìm kiếm của bạn.
                </p>
                <p className="text-gray-500 text-center mt-1">
                  Vui lòng thử lại với một khoa khác hoặc liên hệ với chúng tôi
                  để được hỗ trợ.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const departmentName = listDoctors[0].Department.name;

  return (
    <div className="font-sans p-4">
      <SubHeader
        title="Bác Sĩ"
        subtitle="Danh sách các bác sĩ phù hợp với yêu cầu của bạn."
      />
      {/* Department Header */}
      {departmentName && (
        <div className="w-4/5 mx-auto mt-5 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800">
            Chuyên Khoa: {departmentName}
          </h2>
        </div>
      )}
      {/* Doctors List */}
      <div className="w-4/5 mx-auto mt-5">
        <h3 className="text-lg font-semibold mb-4">
          Tìm thấy {listDoctors?.length || 0} bác sĩ phù hợp.
        </h3>
        {/* Display current page doctors */}
        {currentDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.user_id}
            id={doctor.user_id}
            name={doctor.User.fullname}
            departmentId={doctor.Department.id}
            department={doctor.Department.name}
            email={doctor.User.email}
            phone={doctor.User.phone_number}
            bio={doctor.bio}
          />
        ))}

        {/* Use the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Doctors;
