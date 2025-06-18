import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/reactQuery";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
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
const About = lazy(() => import("./features/guest/About/About"));

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
              <Route
                path="/appointment-history"
                element={<AppointmentHistory />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
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
