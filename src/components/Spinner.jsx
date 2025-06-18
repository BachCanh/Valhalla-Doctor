import React from "react";

const Spinner = ({
  variant = "heartbeat",
  size = "md",
  color = "blue",
  text = "Đang tải...",
  showText = true,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    purple: "text-purple-600",
  };

  // Medical Cross Spinner
  const MedicalCrossSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              opacity="0.3"
            />
            <path d="M12 0L13.5 7.5L21 9L13.5 10.5L12 18L10.5 10.5L3 9L10.5 7.5L12 0Z" />
          </svg>
        </div>
        <div
          className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} animate-pulse`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-full h-full"
          >
            <path d="M12 6v12M6 12h12" />
          </svg>
        </div>
      </div>
      {showText && (
        <p
          className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Heartbeat Spinner
  const HeartbeatSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} ${colorClasses[color]}`}>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full animate-heartbeat"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-ping`}
          ></div>
        </div>
      </div>
      {showText && (
        <p
          className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Stethoscope Spinner
  const StethoscopeSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-bounce`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-full h-full"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5.2 2.7a.3.3 0 0 0-.4-.4Z" />
          <path d="M8 2c0-.6-.4-1-1-1s-1 .4-1 1v13h2V2Z" />
          <path d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          <path d="M14 12V2a1 1 0 0 0-1-1 1 1 0 0 0-1 1v10" />
          <path d="M14 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
          <path d="M18 12h2a2 2 0 1 1 0 4h-2" />
        </svg>
      </div>
      {showText && (
        <p
          className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // DNA Helix Spinner
  const DNASpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        <div
          className={`absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-400 rounded-full animate-spin`}
        ></div>
        <div
          className={`absolute inset-2 border-4 border-transparent border-b-green-600 border-l-green-400 rounded-full animate-spin-reverse`}
        ></div>
        <div
          className={`absolute inset-4 border-4 border-transparent border-t-purple-600 border-r-purple-400 rounded-full animate-spin`}
        ></div>
      </div>
      {showText && (
        <p
          className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Pills Loading Spinner
  const PillsSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-6 ${colorClasses[color]} rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>
      {showText && (
        <p
          className={`text-sm font-medium ${colorClasses[color]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  const renderSpinner = () => {
    switch (variant) {
      case "medical-cross":
        return <MedicalCrossSpinner />;
      case "heartbeat":
        return <HeartbeatSpinner />;
      case "dna":
        return <DNASpinner />;
      case "stethoscope":
        return <StethoscopeSpinner />;
      case "pills":
        return <PillsSpinner />;
      default:
        return <HeartbeatSpinner />;
    }
  };

  return (
    <div className="flex items-center justify-center p-2">
      {renderSpinner()}
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({
  isLoading,
  children,
  spinnerProps = {},
  overlay = true,
}) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children && (
        <div className={overlay ? "opacity-50 pointer-events-none" : ""}>
          {children}
        </div>
      )}
      <div
        className={`${
          overlay ? "absolute inset-0 bg-white/80 backdrop-blur-sm" : ""
        } flex items-center justify-center z-50`}
      >
        <Spinner {...spinnerProps} />
      </div>
    </div>
  );
};

// Full Page Loader
export const PageLoader = ({ spinnerProps = {} }) => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center z-50">
    <div className="text-center">
      <Spinner
        variant="heartbeat"
        size="xl"
        color="blue"
        text="Valhalla Meds đang khởi động..."
        {...spinnerProps}
      />
      <div className="mt-8 space-y-2">
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Đang chuẩn bị hệ thống chăm sóc sức khỏe
        </p>
      </div>
    </div>
  </div>
);

export default Spinner;
