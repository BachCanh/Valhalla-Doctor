import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/reactQuery";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
const HomePageGuest = lazy(() => import("./features/guest/Home/HomePage"));
const Register = lazy(() => import("./features/guest/Register/Register"));
const Login = lazy(() => import("./features/guest/Login/Login"));
const Appointment = lazy(() => import("./features/patient/AppointmentList"));
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
              <Route path="/appointment-history" element={<Appointment />} />
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
