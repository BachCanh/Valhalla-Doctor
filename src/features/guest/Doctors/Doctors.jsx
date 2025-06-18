import React, { useState, Fragment } from "react";
import DoctorCard from "./DoctorCard";
import useGetDoctorsWithDepartmentId from "../../../hooks/useGetDoctorsWithDepartmentId";
import { useParams } from "react-router-dom";
import SubHeader from "../TrackSymptoms/SubHeader";

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

  // Page navigation functions
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  if (isLoading) {
    return <div className="text-center py-10">Loading doctors...</div>;
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

  console.log("Doctors list:", listDoctors);

  return (
    <div className="font-sans p-4">
      <SubHeader
        title="Bác Sĩ"
        subtitle="Danh sách các bác sĩ phù hợp với yêu cầu của bạn."
      />
      <div className="w-4/5 mx-auto mt-5">
        <h3 className="text-lg font-semibold mb-4">
          Tìm thấy {listDoctors?.length || 0} bác sĩ phù hợp.
        </h3>
        {listDoctors && listDoctors.length > 0 ? (
          <>
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

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  &laquo; Trước
                </button>

                {/* Page numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (num) =>
                        num === 1 ||
                        num === totalPages ||
                        (num >= currentPage - 1 && num <= currentPage + 1)
                    )
                    .map((number, idx, array) => (
                      <Fragment key={number}>
                        {idx > 0 && array[idx - 1] !== number - 1 && (
                          <span className="px-3 py-1">...</span>
                        )}
                        <button
                          onClick={() => goToPage(number)}
                          className={`px-3 py-1 rounded ${
                            currentPage === number
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {number}
                        </button>
                      </Fragment>
                    ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Sau &raquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Doctors;
