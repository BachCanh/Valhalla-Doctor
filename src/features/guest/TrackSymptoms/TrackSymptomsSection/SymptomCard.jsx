function SymptomCard({ text, isSelected = false, onClick }) {
  return (
    <div
      className={`
        border-2 rounded-lg p-3 text-center cursor-pointer transition-colors
        flex-shrink-0 w-fit
        ${
          isSelected
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-blue-400 bg-white text-blue-700 hover:border-blue-500 hover:bg-blue-200"
        }
      `}
      onClick={onClick}
      style={{ minWidth: "max-content" }}
    >
      <div
        className={`text-sm whitespace-nowrap ${
          isSelected ? "font-bold" : "font-medium"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default SymptomCard;
