import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function FlexibleSpinner() {
  return (
    <div className="my-12 flex justify-center">
      {" "}
      {/* <-- adds top & bottom margin */}
      <div className="p-8 flex flex-col items-center w-full max-w-xl scale-105">
        <DotLottieReact
          src="https://lottie.host/c63a7c35-d59d-4f2c-9dae-bf3d05e6b978/Gmyw6B9690.lottie"
          loop
          autoplay
          style={{ width: "100%", maxHeight: "400px" }}
        />
      </div>
    </div>
  );
}

export default FlexibleSpinner;
