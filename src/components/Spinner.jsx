import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-[90%] max-w-md animate-fade-in">
        <DotLottieReact
          src="https://lottie.host/4364a01e-46d0-458b-af9a-55f258cd894a/MNxYVtz6v8.lottie"
          loop
          autoplay
          style={{ width: "100%", maxHeight: "240px" }}
        />
        <p className="mt-4 text-lg md:text-xl font-semibold text-blue-800 text-center">
          Đang tải... Chăm sóc sức khỏe – Luôn bên bạn 💙
        </p>
      </div>
    </div>
  );
}

export default Spinner;
