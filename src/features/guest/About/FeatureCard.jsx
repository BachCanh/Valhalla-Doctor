import React from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-50 hover:bg-slate-100 p-8 rounded-2xl transition-colors">
      {icon}
      <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
