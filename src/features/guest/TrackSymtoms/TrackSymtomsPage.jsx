import DepartmentSection from "./DepartmentSection/DepartmentSection";
import SubHeader from "./SubHeader";
import TrackSymtoms from "./TrackSymtomsSection/TrackSymtoms";

function TrackSymtomsPage() {
  return (
    <div className="">
      <SubHeader
        title="Symptoms"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing."
      />
      <div className=" max-w-6xl mx-auto px-8">
        <TrackSymtoms />
        <DepartmentSection />
      </div>
    </div>
  );
}

export default TrackSymtomsPage;
