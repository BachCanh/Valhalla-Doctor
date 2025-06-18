// TrackSymptomsSection/TrackSymtoms.js
import SymptomCard from "./SymptomCard";
import useFetchAllSymptoms from "../../../../hooks/useFetchAllSymptoms";

function TrackSymtoms({
  selectedSymptoms,
  onToggleSymptom,
  onFilter,
  onReset,
  isFilterLoading,
}) {
  const { symptoms, isLoading, isError, error } = useFetchAllSymptoms();

  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-gray-600">Đang tải danh sách triệu chứng...</div>
      </div>
    );
  }

  // Hiển thị error state
  if (isError) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-red-600">
          Lỗi khi tải triệu chứng: {error?.message || "Có lỗi xảy ra"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Chọn triệu chứng
      </h2>
      <p className="text-gray-600 mb-6">
        Nhấn vào các triệu chứng mà bạn đang gặp phải:
      </p>

      {/* Container cho các cards - responsive flex wrap */}
      <div className="flex flex-wrap gap-3 mb-6">
        {symptoms?.map((symptom) => (
          <SymptomCard
            key={symptom.id}
            text={symptom.name}
            isSelected={selectedSymptoms.includes(symptom.id)}
            onClick={() => onToggleSymptom(symptom.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onFilter}
          disabled={isFilterLoading || selectedSymptoms.length === 0}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {isFilterLoading
            ? "Đang xử lý..."
            : `Lọc khoa (${selectedSymptoms.length})`}
        </button>

        {selectedSymptoms.length > 0 && (
          <button
            onClick={onReset}
            disabled={isFilterLoading}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Đặt lại
          </button>
        )}
      </div>
    </div>
  );
}

export default TrackSymtoms;
