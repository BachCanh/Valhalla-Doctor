import HeaderNav from "./HeaderNav";
import avatar from "../../public/favicon.png";

const Header = () => {
  const dummyUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    img: null,
  };

  const content = (
    <div className="p-4 text-sm text-gray-700">
      <div className="mb-3">
        <h5 className="font-semibold capitalize">{`${dummyUser.firstName} ${dummyUser.lastName}`}</h5>
        <p className="text-xs text-gray-500">{dummyUser.email}</p>
        <a
          href="/dashboard"
          className="text-blue-600 hover:underline text-sm block mt-1"
        >
          Go to Dashboard
        </a>
      </div>
      <button className="w-full text-red-600 text-sm font-medium hover:underline">
        Log Out
      </button>
    </div>
  );

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <HeaderNav
          isLoggedIn={true}
          data={dummyUser}
          avatar={avatar}
          content={content}
          open={false}
          setOpen={() => {}}
        />
      </div>
    </header>
  );
};

export default Header;
