import { Link, useNavigate } from "react-router-dom";

function DoctorCard({ id, name, departmentId, department, bio, email, phone }) {
  const navigate = useNavigate();
  const handleScheduleAppointment = () => {
    // // Pass comprehensive doctor information via navigation state
    navigate(`/appointment/departments/${departmentId}/doctors/${id}`, {
      state: {
        doctor: {
          id: id,
          name: name,
          departmentId: departmentId,
          department: department,
          email: email,
          phone: phone,
          bio: bio
        }
      }
    });
  };
  return (
    <div>
      <div className="flex items-center border-b border-gray-300 py-4">
        <img
          src="https://static.vecteezy.com/system/resources/previews/015/412/022/non_2x/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
          alt={name}
          className="rounded-full w-16 h-16 mr-5"
        />
        <div className="flex-1">
          <div className="font-bold text-base">{name}</div>
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium my-1 shadow-sm">
            {department}
          </div>
          <div className="text-sm text-gray-600 my-1">
            <div>Email: {email}</div>
            <div>SĐT: {phone}</div>
          </div>
          <div className="text-gray-700">{bio}</div>
        </div>
        <button className="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          onClick={handleScheduleAppointment}
        >
          Đặt Lịch Hẹn
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
