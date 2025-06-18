import React from "react";
import DepartmentCard from "./DepartmentCard";

function DepartmentSection() {
  // Dữ liệu mẫu cho các khoa
  const departments = [
    {
      id: 1,
      name: "Khoa Nội Thần Kinh",
      description: "Chuyên khoa điều trị các bệnh lý về thần kinh",
    },
    {
      id: 2,
      name: "Khoa Tim Mạch",
      description: "Chuyên khoa điều trị các bệnh lý tim mạch",
    },
    {
      id: 3,
      name: "Khoa Nhi",
      description: "Chuyên khoa chăm sóc sức khỏe trẻ em",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-4 lg:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Các Khoa Chuyên Môn
          </h2>
        </div>

        {/* Departments List */}
        <div className="flex flex-col gap-6 py-6">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepartmentSection;
