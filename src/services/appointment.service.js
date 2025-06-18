import axios from "axios";
import axiosAuth from "../axios/axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const bookAppointment = async (appointmentData) => {
    try {
        console.log("Data to book appointment:", appointmentData);
        const response = await axiosAuth.post(`${API_URL}/appointment/bookingAppointment`, appointmentData);
        return response.data;
    } catch (error) {
        console.error("Booking error details:", {
            message: error.message,
            status: error.response?.status,
            responseData: error.response?.data,
            stack: error.stack,
        });

        const errMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Không thể đặt lịch hẹn";

        throw { message: errMsg };
    }
}