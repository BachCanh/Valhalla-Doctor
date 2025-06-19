import { Link } from "react-router";

function Logo({ className }) {
  return (
    <div className={`w-10 h-10 ${className}`}>
      <Link to={"/"} className="w-full h-full flex items-center justify-center">
        <img
          src="/favicon.png"
          alt="Valhallal Meds"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}

export default Logo;
