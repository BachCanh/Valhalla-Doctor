import React from "react";
import FeatureCard from "./FeatureCard";
import {
  FindDoctorIcon,
  DepartmentIcon,
  TimeIcon,
  ScheduleIcon,
} from "./Icons";
import featuresData from "./featuresData";

function FeatureList() {
  // Map icon components to each feature by index
  const getIconForFeature = (index) => {
    switch (index) {
      case 0:
        return <FindDoctorIcon />;
      case 1:
        return <DepartmentIcon />;
      case 2:
        return <TimeIcon />;
      case 3:
        return <ScheduleIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          icon={getIconForFeature(index)}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}

export default FeatureList;
