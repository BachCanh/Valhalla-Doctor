import axios from "axios";
import axiosAuth from "../axios/axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signupUser = async (data) => {
  try {
    console.log("Data to register:", data);
    const response = await axios.post(`${API_URL}/auth/register`, data);
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      status: error.response?.status,
      responseData: error.response?.data,
      stack: error.stack,
    });

    const errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Không thể đăng kí tài khoản";

    throw { message: errMsg };
  }
};
