// TrackSymptomsPage.js
import { useState } from "react";
import { toast } from "react-toastify";
import useFetchDepartmentsBySymptoms from "../../../hooks/useFetchDepartmentsBySymptoms";
import SubHeader from "./SubHeader";
import TrackSymtoms from "./TrackSymptomsSection/TrackSymptoms";
import DepartmentSection from "./DepartmentSection/DepartmentSection";

function TrackSymtomsPage() {
  // State để quản lý selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Sử dụng hook
  const {
    filterDepartments,
    isLoading: isFilterLoading,
    data: filteredDepartments,
    reset,
    isError,
    error,
  } = useFetchDepartmentsBySymptoms();
  console.log("Filtered Departments:", filteredDepartments);

  // console.log("Filtered Departments:", filteredDepartments);

  // Handler để toggle symptom
  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  // Handler để filter departments
  const handleFilterDepartments = () => {
    console.log("Selected Symptoms when submitting:", selectedSymptoms);
    if (selectedSymptoms.length === 0) {
      toast.error("Vui lòng chọn ít nhất một triệu chứng!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    filterDepartments(selectedSymptoms);
  };

  // Handler để reset
  const handleReset = () => {
    setSelectedSymptoms([]);
    reset();
    setSearchQuery("");
  };

  return (
    <div className="">
      <SubHeader
        title="Symptoms"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."
      />
      <div className="max-w-6xl mx-auto px-8">
        <TrackSymtoms
          selectedSymptoms={selectedSymptoms}
          onToggleSymptom={toggleSymptom}
          onFilter={handleFilterDepartments}
          onReset={handleReset}
          isFilterLoading={isFilterLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <DepartmentSection
          filteredDepartments={filteredDepartments}
          isFilterLoading={isFilterLoading}
          filterError={isError ? error : null}
        />
      </div>
    </div>
  );
}

export default TrackSymtomsPage;
