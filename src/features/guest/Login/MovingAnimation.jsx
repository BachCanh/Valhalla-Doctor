import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function MovingAnimation() {
  return (
    <div className="flex items-center justify-center w-full p-6 md:w-1/2 bg-blue-50">
      <div className="w-full max-w-md">
        <DotLottieReact
          src="https://lottie.host/411269e3-4183-475b-8410-090e8d7097f9/seQWFXCFrt.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
        <p className="text-center text-sm text-blue-600 mt-2 font-medium">
          Chăm sóc sức khỏe – Luôn bên bạn
        </p>
      </div>
    </div>
  );
}

export default MovingAnimation;
