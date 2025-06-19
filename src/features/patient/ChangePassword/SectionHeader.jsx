/**
 * Component tiêu đề phần với thanh dọc màu xanh
 */
function SectionHeader({ title }) {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="h-6 w-1.5 bg-blue-600 rounded-sm" />
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
  );
}

export default SectionHeader;
