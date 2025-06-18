import { Button, Steps, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import SelectApppointment from "./SelectApppointment";
import PersonalInformation from "./PatientInformation";
function AppointmentPage() {
    const [current, setCurrent] = useState(0);
    const [IsDisable, setIsDisable] = useState(true);
    const [isConfirmDisable, setIsConfirmDisable] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const next = () => { setCurrent(current + 1) };
    const prev = () => { setCurrent(current - 1) };

    // Handle confirm schedule function (placeholder)
    const handleConfirmSchedule = () => {
        setIsLoading(true);
        // Your confirmation logic here
        setTimeout(() => setIsLoading(false), 1000);
    };
    
    const handleDateChange = (date) => { setSelectedDate(moment(date).format('YYYY-MM-DD HH:mm:ss')) }
    
    // Check if both date and time are selected
    const isAppointmentSelected = selectedDate && selectTime;
    
    const steps = [
        {
            title: 'Select Appointment Date & Time',
            content: <SelectApppointment
                handleDateChange={handleDateChange}
                selectedDate={selectedDate}
                selectTime={selectTime}
                setSelectTime={setSelectTime}
            />
        },
        {
            title: 'Patient Information',
            content: <PersonalInformation />
        },
    ]

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    return (
        <div className="flex items-center justify-center p-4 mt-4 mb-4">
            <div className="flex flex-col w-full max-w-6xl overflow-hidden bg-white rounded-2xl shadow-lg">
                {/* Steps section - separate from content */}
                <div className="p-4 border-b">
                    <Steps current={current} items={items} />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6">
                    {steps[current].content}
                </div>

                {/* Navigation buttons - clear separation */}
                <div className="flex justify-end p-4 border-t">
                    {current > 0 && (
                        <Button
                            size="large"
                            onClick={() => prev()}
                            style={{ marginRight: 8 }}
                        >
                            Previous
                        </Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button
                            type="primary"
                            size="large"
                            disabled={current === 0 ? !isAppointmentSelected : IsDisable}
                            onClick={() => next()}
                        >
                            Next
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button
                            type="primary"
                            size="large"
                            disabled={isConfirmDisable}
                            loading={isLoading}
                            onClick={handleConfirmSchedule}
                        >
                            Confirm
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppointmentPage