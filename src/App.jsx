import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/reactQuery";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
import PatientLayout from "./layouts/PatientLayout/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout/DoctorLayout";

import TrackSymtomsPage from "./features/guest/TrackSymptoms/TrackSymptomsPage";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Contact from "./features/guest/Contact/Contact";
import Blog from "./features/guest/Blog/Blog";

// Lazy-loaded routes
const HomePageGuest = lazy(() => import("./features/guest/Home/HomePage"));
const Register = lazy(() => import("./features/guest/Register/Register"));
const Login = lazy(() => import("./features/guest/Login/Login"));
const Doctors = lazy(() => import("./features/guest/Doctors/Doctors"));
const AppointmentPage = lazy(() =>
  import("./features/guest/Appointment/AppointmentPage")
);
const AppointmentHistory = lazy(() =>
  import("./features/patient/Appointment/AppointmentList")
);
const ChangePassword = lazy(() =>
  import("./features/patient/ChangePassword/ChangePassword")
);
const About = lazy(() => import("./features/guest/About/About"));
const DoctorAppointments = lazy(() =>
  import("./features/doctor/Appointment/AppointmentList")
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GeneralLayout />}>
              <Route index element={<HomePageGuest />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<TrackSymtomsPage />} />
              <Route
                path="/appointment/departments/:departmentId/doctors"
                element={<Doctors />}
              />
              <Route
                path="/appointment/departments/:departmentId/doctors/:doctorId"
                element={<AppointmentPage />}
              />

              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />

            </Route>
            <Route element={<PatientLayout />}>
              <Route
                index
                path="/customer/appointment-history"
                element={<AppointmentHistory />}
              />
              <Route
                index
                path="/customer/change-password"
                element={<ChangePassword />}
              />
            </Route>
            <Route element={<DoctorLayout />}>
              <Route
                index
                path="/doctor/appointments"
                element={<DoctorAppointments />}
              />
            </Route>
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
