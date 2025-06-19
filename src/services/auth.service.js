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
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng nhập tài khoản";
    throw { message: errMsg };
  }
};
export const logOut = async () => {
  try {
    const response = await axiosAuth.post(`${API_URL}/auth/logOut`);
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng xuất tài khoản";
    throw { message: errMsg };
  }
};
export const validateJWT = async () => {
  try {
    const response = await axiosAuth.post(`${API_URL}/auth/validateJWT`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Token không hợp lệ";
    throw { message: errMsg };
  }
};
export const isEmailAvailable = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/isEmailAvailable`, {
      email, // sent in the request body
    });
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể kiểm tra email";
    throw { message: errMsg };
  }
};
export const changePassword = async (passwordData) => {
  try {
    const { currentPassword, newPassword } = passwordData;
    const response = await axiosAuth.post(
      `${API_URL}/auth/changePassword`,
      {
        currentPassword,
        newPassword,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Không thể thay đổi mật khẩu";

    throw { message: errMsg };
  }
};
