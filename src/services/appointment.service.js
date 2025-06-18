import axiosAuth from "../axios/axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
export const getMyAppointments = async ({ status = "all", page = 1, limit = 10 }) => {
    const res = await axiosAuth.get(`${API_URL}/appointment/getAllAppointmentsBelonged`, {
        params: { status, page, limit },
    });


    return res.data; // Nên trả về { data: [...], total, page, ... }
};