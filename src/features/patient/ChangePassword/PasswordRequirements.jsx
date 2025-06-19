/**
 * Component hiển thị các yêu cầu của mật khẩu
 */
function PasswordRequirements({ password = "" }) {
  const requirements = [
    {
      id: "length",
      text: "Mật khẩu tối thiểu 8 ký tự",
      validate: (pass) => pass.length >= 8,
    },
    {
      id: "uppercase",
      text: "Ít nhất một chữ cái viết hoa",
      validate: (pass) => /[A-Z]/.test(pass),
    },
    {
      id: "lowercase",
      text: "Ít nhất một chữ cái viết thường",
      validate: (pass) => /[a-z]/.test(pass),
    },
    {
      id: "special",
      text: "Ít nhất một ký tự đặc biệt (@$!%*?&)",
      validate: (pass) => /[@$!%*?&]/.test(pass),
    },
  ];

  return (
    <div className="mt-2 text-xs text-gray-900">
      <p className="mb-1 text-sm font-medium text-gray-700">
        Yêu cầu mật khẩu:
      </p>
      <ul className="list-inside space-y-1">
        {requirements.map((req) => (
          <li
            key={req.id}
            className={`flex items-center ${
              req.validate(password) ? "text-green-500" : "text-red-500"
            }`}
          >
            <span>{req.validate(password) ? "✓" : "✗"}</span>
            <span className="ml-2">{req.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;
