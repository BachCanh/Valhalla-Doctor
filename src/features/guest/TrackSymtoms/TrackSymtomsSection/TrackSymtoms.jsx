import { useState } from "react";
import SymptomCard from "./SymptomCard";
import { toast, ToastContainer } from "react-toastify";

function TrackSymtoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Dữ liệu triệu chứng mẫu
  const symptoms = [
    "Sốt",
    "Ho",
    "Đau đầu",
    "Mệt mỏi",
    "Đau cơ",
    "Khó thở",
    "Đau họng",
    "Chảy nước mũi",
    "Buồn nôn",
    "Tiêu chảy",
    "Mất vị giác",
    "Phát ban da",
    "Đau bụng",
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Vui lòng chọn ít nhất một triệu chứng!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Chọn triệu chứng
      </h2>
      <p className="text-gray-600 mb-6">
        Nhấn vào các triệu chứng mà bạn đang gặp phải:
      </p>

      {/* Container cho các cards - responsive flex wrap */}
      <div className="flex flex-wrap gap-3">
        {symptoms.map((symptom, index) => (
          <SymptomCard
            key={index}
            text={symptom}
            isSelected={selectedSymptoms.includes(symptom)}
            onClick={() => toggleSymptom(symptom)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Xác nhận triệu chứng ({selectedSymptoms.length})
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default TrackSymtoms;
