import React, { useState, useEffect } from "react";
import { Button, Tooltip, Badge, Modal, Card, Alert } from "antd";
import moment from "moment";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const doctorTimeSlot = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

function SelectApppointment({
  selectedDate,
  handleDateChange,
  selectTime,
  setSelectTime,
  doctor = {},
  busyTimeSlots = [],
  isSlotBusy,
  zoomPreview,
  setZoomPreview,
  validationError = false, // New prop for displaying validation error
  setValidationError = () => {}, // Function to set validation error
}) {
  const [activeTab, setActiveTab] = useState("calendar");
  const [viewType, setViewType] = useState("calendar"); // calendar or list
  const [showDateAlert, setShowDateAlert] = useState(false);
  const [showTimeAlert, setShowTimeAlert] = useState(false);

  // Reset alerts when selections change
  useEffect(() => {
    if (selectedDate) setShowDateAlert(false);
  }, [selectedDate]);

  useEffect(() => {
    if (selectTime) setShowTimeAlert(false);
  }, [selectTime]);

  // Reset validation error when selections change
  useEffect(() => {
    if (selectedDate && selectTime && validationError) {
      setValidationError(false);
    }
  }, [selectedDate, selectTime, validationError, setValidationError]);

  const handleSelectTime = (date) => {
    setSelectTime(date);
    setShowTimeAlert(false);
  };

  const amTimeSlot = doctorTimeSlot.filter((item) => item.includes("AM"));
  const pmTimeSlot = doctorTimeSlot.filter((item) => item.includes("PM"));

  // Only show the next 9 days
  const next9Days = Array.from({ length: 9 }, (_, index) =>
    moment().clone().add(index, "days")
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Validation Alert - Show when user tries to continue without selections */}
      {validationError && (
        <Alert
          message="Missing Information"
          description="Please select both a date and time for your appointment before continuing."
          type="error"
          showIcon
          closable
          className="mb-4"
          onClose={() => setValidationError(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Date List Column */}
        <div className="lg:w-5/12">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-[#2c4964]">
                Select a Date
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Choose from available days
              </p>
            </div>

            {showDateAlert && (
              <div className="inline-flex items-center text-red-500 text-xs">
                <WarningOutlined className="mr-1" /> Required
              </div>
            )}
          </div>

          {/* Date Cards with animation for required selection */}
          <div
            className={`grid grid-cols-3 gap-3 ${
              showDateAlert
                ? "animate-pulse border-2 border-dashed border-red-300 p-2 rounded-lg"
                : ""
            }`}
          >
            {next9Days.map((date, index) => (
              <Card
                key={index}
                onClick={() => handleDateChange(date)}
                hoverable
                className={`cursor-pointer transition-all duration-200 ${
                  selectedDate &&
                  moment(date).format("YYYY-MM-DD") ===
                    moment(selectedDate).format("YYYY-MM-DD")
                    ? "border-blue-500 ring-2 ring-blue-200 transform -translate-y-1 shadow-md"
                    : "hover:shadow-md"
                }`}
                bodyStyle={{ padding: "12px" }}
              >
                <div className="text-center">
                  <div className="text-gray-500 text-xs font-medium">
                    {moment(date).format("ddd")}
                  </div>
                  <div className="text-xl font-bold my-1">
                    {moment(date).format("D")}
                  </div>
                  <div className="text-xs text-gray-500">
                    {moment(date).format("MMMM")}
                  </div>
                  <div className="mt-2">
                    <Badge status="success" text="Available" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Time Slots Column */}
        <div className="lg:w-7/12 mt-6 lg:mt-0">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-[#2c4964]">
                {selectedDate ? (
                  <span>
                    Available Times for{" "}
                    {moment(selectedDate).format("ddd, MMM D")}
                  </span>
                ) : (
                  "Select a date to view available times"
                )}
              </h3>
              {selectedDate && (
                <p className="text-gray-500 text-sm mt-1">
                  All appointment times are in your local timezone
                </p>
              )}
            </div>

            {selectedDate && showTimeAlert && (
              <div className="inline-flex items-center text-red-500 text-xs">
                <WarningOutlined className="mr-1" /> Time selection required
              </div>
            )}
          </div>

          {selectedDate ? (
            <div
              className={`space-y-6 ${
                showTimeAlert
                  ? "animate-pulse border-2 border-dashed border-red-300 p-2 rounded-lg"
                  : ""
              }`}
            >
              {/* Morning Slots */}
              <div>
                <h4 className="flex items-center text-[#2c4964] mb-3">
                  <ClockCircleOutlined className="mr-2" /> Morning
                  <span className="ml-2 text-xs text-gray-500">
                    (8:00 AM - 12:00 PM)
                  </span>
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {amTimeSlot.map((item, id) => {
                    const isBusy = isSlotBusy
                      ? isSlotBusy(item)
                      : busyTimeSlots.includes(item);
                    return (
                      <Tooltip
                        key={id}
                        title={
                          isBusy
                            ? "This slot is already booked"
                            : `30 min appointment at ${item}`
                        }
                      >
                        <div className="relative">
                          <Button
                            type={item === selectTime ? "primary" : "default"}
                            className={`w-full ${
                              isBusy
                                ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                                : "hover:border-blue-500 hover:text-blue-500"
                            } ${
                              item === selectTime
                                ? "border-blue-500 text-blue-500"
                                : ""
                            }`}
                            onClick={() => !isBusy && handleSelectTime(item)}
                            disabled={isBusy}
                          >
                            {item}
                          </Button>
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div>
                <h4 className="flex items-center text-[#2c4964] mb-3">
                  <ClockCircleOutlined className="mr-2" /> Afternoon
                  <span className="ml-2 text-xs text-gray-500">
                    (1:00 PM - 5:00 PM)
                  </span>
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {pmTimeSlot.map((item, id) => {
                    const isBusy = isSlotBusy
                      ? isSlotBusy(item)
                      : busyTimeSlots.includes(item);
                    return (
                      <Tooltip
                        key={id}
                        title={
                          isBusy
                            ? "This slot is already booked"
                            : `30 min appointment at ${item}`
                        }
                      >
                        <div className="relative">
                          <Button
                            type={item === selectTime ? "primary" : "default"}
                            className={`w-full ${
                              isBusy
                                ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                                : "hover:border-blue-500 hover:text-blue-500"
                            } ${
                              item === selectTime
                                ? "border-blue-500 text-blue-500"
                                : ""
                            }`}
                            onClick={() => !isBusy && handleSelectTime(item)}
                            disabled={isBusy}
                          >
                            {item}
                          </Button>
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <CalendarOutlined className="text-4xl text-gray-400 mb-3" />
              <p className="text-gray-500">
                Please select a date to see available time slots
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Validation Help Text */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          {!selectedDate || !selectTime ? (
            <div className="text-yellow-500 flex items-center">
              <WarningOutlined className="mr-2" />
              {!selectedDate
                ? "Please select a date first"
                : "Please select a time slot to continue"}
            </div>
          ) : (
            <div className="text-green-500 flex items-center">
              <CheckCircleOutlined className="mr-2" />
              Your appointment is set for{" "}
              {moment(selectedDate).format("MMM D, YYYY")} at {selectTime}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Preview Modal */}
      <Modal
        title="Zoom Meeting Preview"
        open={zoomPreview}
        onCancel={() => setZoomPreview(false)}
        footer={[
          <Button key="close" onClick={() => setZoomPreview(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {doctor.name?.charAt(0) || "D"}
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {doctor.name || "Doctor"}'s Meeting Room
                </p>
                <p className="text-xs text-gray-300">
                  Meeting ID: 123 456 7890
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                type="primary"
                danger
                size="small"
                icon={<CloseCircleOutlined />}
              >
                Leave
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
              <img
                src={
                  doctor.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/015/412/022/non_2x/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
                }
                alt="Doctor"
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                Dr. {doctor.name || "Doctor"}
              </div>
            </div>
            <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
              <div className="h-32 w-32 bg-gray-600 rounded-lg flex items-center justify-center">
                <UserOutlined className="text-5xl text-gray-400" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                You
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              This is a preview of how your online consultation will look. On
              the day of your appointment, you'll receive a link to join the
              actual meeting.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Export a validation utility function
export const validateAppointmentSelection = (selectedDate, selectTime) => {
  return !!selectedDate && !!selectTime;
};

export default SelectApppointment;
