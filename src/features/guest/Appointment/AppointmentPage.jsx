import { Button, Input, message } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SelectApppointment from "./SelectApppointment";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import useBookingAppointment from "../../../hooks/useBookingAppointment";
function AppointmentPage() {
    const { isAuthenticated } = useAuthContext();
    // Get URL parameters
    const { doctorId, departmentId } = useParams();
    const { bookAppointment, isBooking } = useBookingAppointment();

    // Get data passed through navigation state
    const location = useLocation();
    const doctor = location.state?.doctor || {};

    // Set up state variables
    const [selectedDate, setSelectedDate] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    // Check if both date and time are selected
    const isAppointmentSelected = selectedDate && selectTime;

    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format('YYYY-MM-DD HH:mm:ss'));
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

    return (
        <div className="flex items-center justify-center p-4 mt-4 mb-4">
            <div className="flex flex-col w-full max-w-6xl overflow-hidden bg-white rounded-2xl shadow-lg">
                {/* Header with doctor info */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/015/412/022/non_2x/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
                            alt={doctor.name || "Doctor"}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-[#2c4964]">
                                Schedule with Dr. {doctor.name || "Doctor"}
                            </h2>
                            <p className="text-gray-600">{doctor.department || "Medical Department"}</p>
                        </div>
                    </div>
                </div>

                {/* Main content section */}
                <div className="flex-1 p-6">
                    <SelectApppointment
                        handleDateChange={handleDateChange}
                        selectedDate={selectedDate}
                        selectTime={selectTime}
                        setSelectTime={setSelectTime}
                        doctor={doctor}
                    />

                    {/* Notes textarea */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-[#2c4964] mb-3 font-medium">Additional Notes</h3>
                        <Input.TextArea
                            placeholder="Add any notes or specific concerns for your appointment..."
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Confirm button */}
                <div className="flex justify-end p-4 border-t">
                    <Button
                        type="primary"
                        size="large"
                        disabled={!isAppointmentSelected}
                        loading={isLoading}
                        onClick={handleConfirmSchedule}
                    >
                        Xác nhận lịch hẹn
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentPage;