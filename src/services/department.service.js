// services/symptom.service.js
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const deparmentService = {
  getDepartmentsBySymptoms: async (symptomIds) => {
    console.log("Fetching departments by symptoms:", symptomIds);
    try {
      const response = await axios.post(
        `${API_URL}/department/getDepartmentsBySymptoms`,
        {
          symptomIds,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fetching departments by symptoms error:", error);

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể lấy danh sách khoa";

      throw { message: errMsg };
    }
  },
};

export default deparmentService;
