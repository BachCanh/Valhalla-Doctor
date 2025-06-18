import { useState } from "react";
import SymptomCard from "./SymptomCard";

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
    "Chóng mặt",
    "Khó ngủ",
    "Đau đầu",
    "Chảy nước mũi",
    "Buồn nôn",
    "Tiêu chảy",
    "Mất vị giác",
    "Phát ban da",
    "Đau bụng",
    "Chóng mặt",
    "Khó ngủ",
    "Đau đầu",
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
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
    </div>
  );
}

export default TrackSymtoms;
