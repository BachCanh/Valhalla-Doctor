function DoctorCard({ name, department, bio }) {
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
          <div className="text-gray-500 my-1">{department}</div>
          <div className="text-gray-700">{bio}</div>
        </div>
        <button className="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          Đặt khám
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
