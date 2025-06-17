import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

// GeneralLayout.jsx
function GeneralLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Add pt-16 or appropriate top padding based on your header height */}
      <main className="flex-grow relative min-h-[660px] pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default GeneralLayout;
