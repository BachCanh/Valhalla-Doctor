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
import PatientInformation from "./PatientInformation";
import confetti from "canvas-confetti";

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
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3 and 5
  }, [doctorId]);

  // Step configuration
  const steps = [
    {
      title: "Select Time",
      icon: <CalendarOutlined />,
      description: "Choose appointment date and time",
    },
    {
      title: "Add Details",
      icon: <FileTextOutlined />,
      description: "Provide appointment details",
    },
    {
      title: "Confirm",
      icon: <CheckCircleOutlined />,
      description: "Review and confirm booking",
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
      message.error("Please select both date and time for your appointment");
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

    console.log("Appointment data:", appointmentData);
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
      message.warning("Please select both date and time before continuing");
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
                Additional Information
              </h3>

              <PatientInformation />

              <div className="mt-6">
                <h4 className="text-[#2c4964] font-medium mb-3">
                  <FileTextOutlined className="mr-2" />
                  Notes for Doctor
                </h4>
                <Input.TextArea
                  placeholder="Describe your symptoms or any specific concerns you'd like to discuss..."
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
              Appointment Summary
            </h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <CalendarOutlined className="text-blue-600 text-xl" />
                <div>
                  <h4 className="font-medium text-gray-900">Date & Time</h4>
                  <p className="text-gray-600">
                    {moment(selectedDate).format("dddd, MMMM D, YYYY")}
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
                  <h4 className="font-medium text-gray-900">Doctor</h4>
                  <p className="text-gray-600">{doctor.name || "Doctor"}</p>
                  <p className="text-gray-600">
                    {doctor.department || "Medical Department"}
                  </p>
                  {doctor.specialty && (
                    <p className="text-gray-600">{doctor.specialty}</p>
                  )}
                </div>
              </div>

              {notes && (
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <FileTextOutlined className="text-yellow-600 text-xl" />
                  <div>
                    <h4 className="font-medium text-gray-900">Your Notes</h4>
                    <p className="text-gray-600">{notes}</p>
                  </div>
                </div>
              )}

              <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Important Information
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Please arrive 15 minutes before your appointment time</li>
                  <li>Bring your insurance card and ID</li>
                  <li>Wear a mask during your visit</li>
                  <li>You can cancel or reschedule up to 24 hours before</li>
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
          Appointment Booked Successfully!
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-6">
          Your appointment with Dr. {doctor.name || "Doctor"} on{" "}
          {moment(selectedDate).format("dddd, MMMM D")} at {selectTime} has been
          confirmed.
        </p>
        <div className="space-y-3 w-full max-w-md">
          <Button
            type="primary"
            size="large"
            block
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </Button>
          <Button
            type="default"
            size="large"
            block
            onClick={() => navigate("/departments")}
          >
            Browse More Services
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
                    alt={doctor.name || "Doctor"}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                    {doctor.name || "Doctor"}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-blue-700 text-xs px-2 py-1 rounded-full">
                      {doctor.department || "General Medicine"}
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
              Back
            </Button>
            <div>
              {currentStep < steps.length - 1 ? (
                <Button type="primary" size="large" onClick={handleNextStep}>
                  Continue
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleConfirmSchedule}
                  loading={isLoading || isBooking}
                  disabled={!isAppointmentSelected}
                >
                  Confirm Appointment
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
