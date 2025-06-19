import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

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

export function LoadingOverlay({ isLoading, children, spinnerProps = {} }) {
  if (!isLoading) {
    return <>{children}</>;
  }

  const { variant = "default", size = "md", text } = spinnerProps;

  return (
    <div className="relative">
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        {children}
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-[90%] max-w-md">
            <DotLottieReact
              src={
                variant === "stethoscope"
                  ? "https://lottie.host/c63a7c35-d59d-4f2c-9dae-bf3d05e6b978/Gmyw6B9690.lottie"
                  : "https://lottie.host/4364a01e-46d0-458b-af9a-55f258cd894a/MNxYVtz6v8.lottie"
              }
              loop
              autoplay
              style={{
                width: "100%",
                maxHeight: size === "lg" ? "320px" : "240px",
              }}
            />
            <p className="mt-4 text-lg md:text-xl font-semibold text-blue-800 text-center">
              {text || "Đang tải... Chăm sóc sức khỏe – Luôn bên bạn 💙"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spinner;
