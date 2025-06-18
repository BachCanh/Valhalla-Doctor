import DoctorCard from "./DoctorCard";

const listDoctors = [
  {
    id: 1,
    name: "BS. CK2 Phạm Thế Vũ",
    department: "Nội thần kinh",
    bio: "Chuyên khoa Nội thần kinh, Bệnh viện Đại học Y Dược TP.HCM. Có nhiều năm kinh nghiệm trong lĩnh vực điều trị các bệnh lý thần kinh.",
  },
  {
    id: 2,
    name: "BS. CK1 Nguyễn Văn A",
    department: "Nội thần kinh",
    bio: "Chuyên khoa Nội thần kinh, Bệnh viện Đại học Y Dược TP.HCM. Có nhiều năm kinh nghiệm trong lĩnh vực điều trị các bệnh lý thần kinh.",
  },
  {
    id: 3,
    name: "BS. CK2 Trần Thị B",
    department: "Nội thần kinh",
    bio: "Chuyên khoa Nội thần kinh, Bệnh viện Đại học Y Dược TP.HCM. Có nhiều năm kinh nghiệm trong lĩnh vực điều trị các bệnh lý thần kinh.",
  },
];

function Doctors() {
  return (
    <div className="font-sans p-4">
      <div className="w-4/5 mx-auto">
        <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3 py-1 text-gray-800 bg-gray-50 rounded-r-md shadow-sm">
          Nội thần kinh
        </h2>
        <h3 className="text-lg font-semibold mb-4">Tìm thấy 22 kết quả.</h3>
        {listDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            department={doctor.department}
            bio={doctor.bio}
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
