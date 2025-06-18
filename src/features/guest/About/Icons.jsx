import React from "react";

export function FindDoctorIcon() {
  return (
    <div className="relative inline-block">
      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute -top-1 right-0 text-pink-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
}

export function DepartmentIcon() {
  return (
    <div className="w-12 h-12 bg-blue-500 rounded-lg p-2 flex flex-col justify-between shadow-md shadow-blue-500/20">
      <div className="h-2.5 bg-blue-300 rounded-sm"></div>
      <div className="grid grid-cols-4 gap-1 px-0.5">
        {Array(8)
          .fill()
          .map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
          ))}
      </div>
    </div>
  );
}

export function TimeIcon() {
  return (
    <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-md shadow-orange-500/20">
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path>
      </svg>
    </div>
  );
}

export function ScheduleIcon() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 bg-purple-200 rounded-lg blur-md"></div>
      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <div className="w-8 h-6 bg-white/80 rounded-sm"></div>
      </div>
    </div>
  );
}
