import axiosAuth from "../axios/axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const bookAppointment = async (appointmentData) => {
  try {
    console.log("Data to book appointment:", appointmentData);
    const response = await axiosAuth.post(
      `${API_URL}/appointment/bookingAppointment`,
      appointmentData
    );
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
};

export const getMyAppointments = async ({
  status = "all",
  page = 1,
  limit = 10,
}) => {
  const res = await axiosAuth.get(
    `${API_URL}/appointment/getAllAppointmentsBelonged`,
    {
      params: { status, page, limit },
    }
  );

  return res.data; // Nên trả về { data: [...], total, page, ... }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axiosAuth.post(
      `${API_URL}/appointment/cancelAppointment`,
      { appointmentId }
    );
    return response.data;
  } catch (error) {
    console.error("Cancellation error details:", {
      message: error.message,
      status: error.response?.status,
      responseData: error.response?.data,
      stack: error.stack,
    });

    const errMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Không thể hủy lịch hẹn";

    throw { message: errMsg };
  }
};
export const getDoctorAppointments = async ({
  status = "all",
  page = 1,
  limit = 10,
}) => {
  const res = await axiosAuth.get(
    `${API_URL}/appointment/getAllAppointmentForDoctor`,
    {
      params: { status, page, limit },
    }
  );
  return res.data; // Trả về { appointments, total, page, totalPages }
};

export const doctorUpdateAppointment = async (sendData) => {
  const res = await axiosAuth.put(`${API_URL}/appointment/adjustStatus`, {
    sendData,
  });
  return res.data;
};
