import axiosAuth from "../axios/axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const patientService = {
  /**
   * Lấy thông tin profile của người dùng hiện tại
   * @returns {Promise} Promise chứa thông tin profile
   */
  getUserProfile: async () => {
    try {
      const response = await axiosAuth.get(`${API_URL}/patient/get`);
      return response.data;
    } catch (error) {
      console.error("Fetching profile error details:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        stack: error.stack,
      });

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể lấy thông tin cá nhân";

      throw { message: errMsg };
    }
  },

  /**
   * Cập nhật thông tin profile của người dùng
   * @param {Object} profileData - Dữ liệu profile cần cập nhật
   * @returns {Promise} Promise chứa thông tin profile đã được cập nhật
   */
  updateUserProfile: async (profileData) => {
    try {
      const response = await axiosAuth.put(
        `${API_URL}/patient/update`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Update profile error details:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        stack: error.stack,
      });

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể cập nhật thông tin cá nhân";

      throw { message: errMsg };
    }
  },
};

export default patientService;
