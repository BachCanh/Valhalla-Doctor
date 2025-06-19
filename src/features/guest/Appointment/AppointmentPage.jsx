import {
  Button,
  Input,
  message,
  Steps,
  Divider,
  Calendar,
  Badge,
  Tooltip,
} from "antd";
import moment from "moment";
import "moment/locale/vi"; // Thêm locale tiếng Việt
import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SelectApppointment from "./SelectApppointment";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import useBookingAppointment from "../../../hooks/useBookingAppointment";
import useGetDoctorBusyDates from "../../../hooks/useGetDoctorBusyDates";
import { LoadingOverlay } from "../../../components/Spinner";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  UserOutlined,
  BellOutlined,
  StarFilled,
  CheckOutlined,
} from "@ant-design/icons";
import confetti from "canvas-confetti";

// Thiết lập locale cho moment.js
moment.locale("vi");

function AppointmentPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { doctorId, departmentId } = useParams();
  const { bookAppointment, isBooking, isSuccess } = useBookingAppointment();
  const location = useLocation();
  const doctor = location.state?.doctor || {};

  // State variables
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [zoomPreview, setZoomPreview] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Fetch doctor's busy dates
  const {
    busyDates,
    isLoading: isLoadingBusyDates,
    isDateBusy,
    getBusyTimeSlotsForDate,
    isTimeSlotBusy,
  } = useGetDoctorBusyDates(doctorId);

  // Authentication check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Memoized doctor rating
  const doctorRating = useMemo(() => {
    return (Math.random() * 2 + 3).toFixed(1); // Đánh giá ngẫu nhiên từ 3 đến 5
  }, [doctorId]);

  // Step configuration
  const steps = [
    {
      title: "Chọn thời gian",
      icon: <CalendarOutlined />,
      description: "Chọn ngày và giờ khám",
    },
    {
      title: "Thông tin bổ sung",
      icon: <FileTextOutlined />,
      description: "Cung cấp chi tiết cuộc hẹn",
    },
    {
      title: "Xác nhận",
      icon: <CheckCircleOutlined />,
      description: "Xem lại và xác nhận đặt lịch",
    },
  ];

  // Check if both date and time are selected
  const isAppointmentSelected = selectedDate && selectTime;

  // Show success confetti on successful booking
  useEffect(() => {
    if (isSuccess && !bookingComplete) {
      setBookingComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Auto navigate to dashboard after delay
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isSuccess, navigate, bookingComplete]);

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD HH:mm:ss"));
    setSelectTime(""); // Clear time selection when date changes
  };

  // Handle confirm schedule function
  const handleConfirmSchedule = () => {
    if (!isAppointmentSelected) {
      message.error("Vui lòng chọn cả ngày và giờ cho lịch hẹn của bạn");
      return;
    }

    setIsLoading(true);

    // Prepare appointment data
    const appointmentData = {
      doctorId,
      appoint_taken_date: selectedDate,
      appointment_time: selectTime,
      notes: notes,
    };

    console.log("Thông tin lịch hẹn:", appointmentData);
    bookAppointment(appointmentData);
  };

  // Convert busy time slots to 12-hour format for comparison
  const convertBusySlotTo12Hour = (timeSlot) => {
    const time = moment(timeSlot, "HH:mm:ss");
    return time.format("hh:mm A");
  };

  // Get busy time slots for selected date in 12-hour format
  const getBusyTimeSlots = () => {
    if (!selectedDate) return [];
    const dateString = moment(selectedDate).format("YYYY-MM-DD");
    const busySlots = getBusyTimeSlotsForDate(dateString);
    return busySlots.map((slot) => convertBusySlotTo12Hour(slot));
  };

  // Check if a time slot is busy
  const isSlotBusy = (timeSlot) => {
    if (!selectedDate) return false;
    const dateString = moment(selectedDate).format("YYYY-MM-DD");
    const time24 = moment(timeSlot, "hh:mm A").format("HH:mm:00");
    return isTimeSlotBusy(dateString, time24);
  };

  // Next step handler
  const handleNextStep = () => {
    if (currentStep === 0 && !isAppointmentSelected) {
      message.warning("Vui lòng chọn cả ngày và giờ trước khi tiếp tục");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // Previous step handler
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectApppointment
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            selectTime={selectTime}
            setSelectTime={setSelectTime}
            doctor={doctor}
            busyTimeSlots={getBusyTimeSlots()}
            isSlotBusy={isSlotBusy}
            zoomPreview={zoomPreview}
            setZoomPreview={setZoomPreview}
          />
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-[#2c4964] mb-4">
                Thông tin bổ sung
              </h3>

              <div className="mt-6">
                <h4 className="text-[#2c4964] font-medium mb-3">
                  <FileTextOutlined className="mr-2" />
                  Ghi chú cho Bác sĩ
                </h4>
                <Input.TextArea
                  placeholder="Mô tả triệu chứng hoặc bất kỳ vấn đề cụ thể nào bạn muốn trao đổi..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg"
                  maxLength={500}
                  showCount
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[#2c4964] mb-6">
              Tóm tắt lịch hẹn
            </h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <CalendarOutlined className="text-blue-600 text-xl" />
                <div>
                  <h4 className="font-medium text-gray-900">Ngày & Giờ</h4>
                  <p className="text-gray-600">
                    {moment(selectedDate).format(
                      "dddd, [ngày] D [tháng] M, YYYY"
                    )}
                  </p>
                  <p className="text-gray-600">
                    {selectTime} -{" "}
                    {moment(selectTime, "hh:mm A")
                      .add(30, "minutes")
                      .format("hh:mm A")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <UserOutlined className="text-green-600 text-xl" />
                <div>
                  <h4 className="font-medium text-gray-900">Bác sĩ</h4>
                  <p className="text-gray-600">{doctor.name || "Bác sĩ"}</p>
                  <p className="text-gray-600">{doctor.department || "Khoa"}</p>
                  {doctor.specialty && (
                    <p className="text-gray-600">{doctor.specialty}</p>
                  )}
                </div>
              </div>

              {notes && (
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <FileTextOutlined className="text-yellow-600 text-xl" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Ghi chú của bạn
                    </h4>
                    <p className="text-gray-600">{notes}</p>
                  </div>
                </div>
              )}

              <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Thông tin quan trọng
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Vui lòng đến trước giờ hẹn 15 phút</li>
                  <li>Mang theo thẻ bảo hiểm và giấy tờ tùy thân</li>
                  <li>Đeo khẩu trang trong suốt thời gian khám</li>
                  <li>Bạn có thể hủy hoặc đổi lịch hẹn trước 24 giờ</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (bookingComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 bg-white rounded-2xl shadow-lg">
        <div className="bg-green-50 p-8 rounded-full mb-6">
          <CheckCircleOutlined className="text-green-600 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đặt lịch khám thành công!
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-6">
          Lịch hẹn của bạn với BS. {doctor.name || "Bác sĩ"} vào ngày{" "}
          {moment(selectedDate).format("dddd, [ngày] D [tháng] M")} lúc{" "}
          {selectTime} đã được xác nhận.
        </p>
        <div className="space-y-3 w-full max-w-md">
          <Button
            type="primary"
            size="large"
            block
            onClick={() => navigate("/")}
          >
            Về Trang chủ
          </Button>
          <Button
            type="default"
            size="large"
            block
            onClick={() => navigate("/departments")}
          >
            Xem thêm dịch vụ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <LoadingOverlay
      isLoading={isLoadingBusyDates}
      spinnerProps={{
        variant: "stethoscope",
        size: "lg",
        text: "Đang tải lịch bác sĩ...",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Doctor header with premium styling */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={
                      doctor.avatar ||
                      "https://static.vecteezy.com/system/resources/previews/015/412/022/non_2x/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
                    }
                    alt={doctor.name || "Bác sĩ"}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                    {doctor.name || "Bác sĩ"}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-blue-700 text-xs px-2 py-1 rounded-full">
                      {doctor.department || "Khoa Đa khoa"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step progress indicator */}
          <div className="p-6 border-b">
            <Steps
              current={currentStep}
              items={steps.map((step) => ({
                title: step.title,
                description: step.description,
                icon: step.icon,
              }))}
            />
          </div>

          {/* Main content */}
          <div className="p-6">{renderStepContent()}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              size="large"
            >
              {currentStep === 0 ? "Hủy" : "Quay lại"}
            </Button>
            <div>
              {currentStep < steps.length - 1 ? (
                <Button type="primary" size="large" onClick={handleNextStep}>
                  Tiếp tục
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleConfirmSchedule}
                  loading={isLoading || isBooking}
                  disabled={!isAppointmentSelected}
                >
                  Xác nhận đặt lịch
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default AppointmentPage;
