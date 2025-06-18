import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const symptomService = {
  getAllSymptoms: async () => {
    try {
      const response = await axios.get(`${API_URL}/symptom/getAllSymptoms`);
      return response.data;
    } catch (error) {
      console.error("Fetching symptoms error details:", {
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data,
        stack: error.stack,
      });

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Không thể lấy danh sách triệu chứng";

      throw { message: errMsg };
    }
  },
};

export default symptomService;
