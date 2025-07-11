import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const doctorService = {
  getDoctorsByDepartment: async (departmentId) => {
    try {
      const response = await axios.get(
        `${API_URL}/doctor/by-department/${departmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Fetching doctors error details:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        stack: error.stack,
      });

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể lấy danh sách bác sĩ";

      throw { message: errMsg };
    }
  },
  getDoctorBusyDates: async (doctorId) => {
    try {
      const response = await axios.get(
        `${API_URL}/doctor/busyDates/${doctorId}`
      );
      console.log("Doctor busy dates response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetching busy dates error details:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        stack: error.stack,
      });

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể lấy lịch làm việc của bác sĩ";

      throw { message: errMsg };
    }
  },
};

export default doctorService;
