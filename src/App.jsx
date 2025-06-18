import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/reactQuery";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
import TrackSymtomsPage from "./features/guest/TrackSymtoms/TrackSymtomsPage";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
const HomePageGuest = lazy(() => import("./features/guest/Home/HomePage"));
const Register = lazy(() => import("./features/guest/Register/Register"));
const Login = lazy(() => import("./features/guest/Login/Login"));
const Doctors = lazy(() => import("./features/guest/Doctors/Doctors"));
const Appointment = lazy(() =>
  import("./features/guest/Appointment/AppointmentPage")
);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GeneralLayout />}>
              <Route index element={<HomePageGuest />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<TrackSymtomsPage />} />
              <Route
              path="/appointment/departments/:departmentId/doctors"
              element={<Doctors />}/>
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
