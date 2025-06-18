import React from "react";
import { Link } from "react-router";

function DepartmentCard({ department }) {
  const handleViewDetails = () => {
    // Xử lý khi click vào nút xem chi tiết khoa
    console.log(`Xem chi tiết khoa: ${department.name}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden w-full">
      <div className="p-8 md:p-10 lg:p-12 flex items-center gap-8 md:gap-10 lg:gap-12">
        {/* Department Info */}
        <div className="flex-1 min-w-0 py-2">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 leading-tight">
            {department.name}
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-3 leading-relaxed">
            {department.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 ml-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white border-none px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-lg text-base md:text-lg font-medium cursor-pointer transition-colors duration-300 whitespace-nowrap active:translate-y-px shadow-sm hover:shadow-md"
            onClick={handleViewDetails}
          >
            Xem chi tiết
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-100 flex items-center justify-center bg-gray-50 mb-6">
            <img
              src={department.icon || "/default-department.png"}
              alt={department.name}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.target.src = "/default-department.png";
              }}
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {department.name}
          </h3>
          <p className="text-base text-gray-600 mb-3">
            {department.description}
          </p>
          <p className="text-sm text-gray-500 mb-2">{department.location}</p>
          {department.doctorCount && (
            <p className="text-sm text-blue-600 font-medium mb-6">
              {department.doctorCount} bác sĩ
            </p>
          )}

          <Link
            to={`/appointment/departments`}
            className="bg-blue-500 hover:bg-blue-600 text-white border-none px-8 py-4 rounded-lg text-base font-medium cursor-pointer transition-colors duration-300 w-full shadow-sm hover:shadow-md"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DepartmentCard;
