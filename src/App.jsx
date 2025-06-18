import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/reactQuery";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";
import GeneralLayout from "./layouts/GeneralLayout";
const HomePageGuest = lazy(() => import("./features/guest/Home/HomePage"));
const Register = lazy(() => import("./features/guest/Register/Register"));
const Login = lazy(() => import("./features/guest/Login/Login"));
const Appointment = lazy(() => import("./features/guest/Appointment/AppointmentPage"))
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<GeneralLayout />}>
            <Route index element={<HomePageGuest />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointment" element={<Appointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
