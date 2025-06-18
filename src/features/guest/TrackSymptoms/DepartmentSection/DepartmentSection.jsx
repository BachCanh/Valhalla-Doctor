// DepartmentSection.js
import DepartmentCard from "./DepartmentCard";

function DepartmentSection({
  filteredDepartments,
  isFilterLoading,
  filterError,
}) {
  // Hiển thị error khi lọc
  if (filterError) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-red-600">
          Lỗi khi lọc khoa: {filterError?.message || "Có lỗi xảy ra"}
        </div>
      </div>
    );
  }

  // Hiển thị loading state khi đang lọc
  if (isFilterLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-gray-600">Đang lọc khoa...</div>
      </div>
    );
  }

  // **LOGIC MỚI**: Kiểm tra nếu response có message cảnh báo
  if (
    filteredDepartments?.message &&
    filteredDepartments.message.includes("quá nhiều triệu chứng")
  ) {
    return (
      <div className="p-6">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Cảnh báo sức khỏe
              </h3>
              <p className="text-amber-700 text-base leading-relaxed">
                {filteredDepartments.message}
              </p>
              {filteredDepartments.departmentCount && (
                <p className="text-amber-600 text-sm mt-2">
                  Đã tìm thấy {filteredDepartments.departmentCount} khoa phù hợp
                  với các triệu chứng của bạn.
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-200">
            <div className="text-amber-700 text-sm">
              <p className="font-medium mb-1">Khuyến nghị:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Liên hệ ngay với bệnh viện gần nhất</li>
                <li>Gọi đường dây nóng cấp cứu: 115</li>
                <li>Không tự điều trị tại nhà</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Kiểm tra nếu có filteredDepartments (array)
  const hasFilteredResults =
    filteredDepartments &&
    Array.isArray(filteredDepartments) &&
    filteredDepartments.length > 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {hasFilteredResults ? "Khoa được gợi ý" : "Kết quả tìm kiếm"}
        </h2>
        {hasFilteredResults && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredDepartments.length} khoa phù hợp
          </span>
        )}
      </div>

      {hasFilteredResults ? (
        <div className="space-y-6">
          {filteredDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33.208-.471.404-.926.618-1.325C7.728 10.093 9.77 9 12 9s4.272 1.093 5.462 2.345c.214.399.41.854.618 1.325A7.966 7.966 0 0112 15z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Không tìm thấy khoa nào dựa trên triệu chứng của bạn
          </p>
          <p className="text-sm text-gray-500">
            Vui lòng thử chọn các triệu chứng khác hoặc liên hệ với bác sĩ để
            được tư vấn
          </p>
        </div>
      )}
    </div>
  );
}

export default DepartmentSection;
