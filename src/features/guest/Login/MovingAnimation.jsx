import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function MovingAnimation() {
  return (
    <div className="flex items-center justify-center w-full md:w-1/2 bg-blue-50 p-6">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/411269e3-4183-475b-8410-090e8d7097f9/seQWFXCFrt.lottie"
          loop
          autoplay
          style={{ width: "100%", maxHeight: "280px" }}
        />
        <p className="mt-4 text-lg md:text-xl font-semibold text-[#1e3a8a] text-center">
          Chăm sóc sức khỏe – Luôn bên bạn
        </p>
      </div>
    </div>
  );
}

export default MovingAnimation;