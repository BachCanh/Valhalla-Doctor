import React from 'react'
import { Button } from 'antd'
import moment from 'moment';
import { FaBriefcase, FaRegClock, FaLocationArrow, FaLink, FaCalendarAlt } from "react-icons/fa";

const doctorTimeSlot = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM",
    "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
    "04:30 PM", "05:00 PM"
]

function SelectApppointment({ selectedDate, handleDateChange, selectTime, setSelectTime }) {
    const handleSelectTime = (date) => { setSelectTime(date) }

    const amTimeSlot = doctorTimeSlot.filter((item) => item.includes('AM'));
    const pmTimeSlot = doctorTimeSlot.filter((item) => item.includes('PM'));

    const last10Days = Array.from({ length: 5 }, (_, index) =>
        moment().clone().subtract(index, 'days')
    )
    const next6Days = Array.from({ length: 6 }, (_, index) =>
        moment().clone().add(index, 'days')
    );
    return (
        <div className="mt-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex flex-col lg:flex-row">
                    {/* Column 1: Appointment Information */}
                    <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <h3 className="pb-2 mb-4 border-b border-gray-200 font-medium text-[#2c4964] text-base min-h-[60px]">
                            Would you like to schedule an Interview? Pick a Date & Time
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaBriefcase className=" text-lg text-blue-500 mt-0.5" />
                                <p className="text-sm text-[#2c4964] font-semibold">With Doctor</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaRegClock className=" text-lg text-blue-500 mt-0.5" />
                                <p className="text-sm text-[#2c4964] font-semibold">30 Min</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaLocationArrow className=" text-lg text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-[#2c4964] font-semibold">Sylhet, Bangladesh</p>
                                    <span className="text-sm text-gray-500">1020BD, Amertam, NorthEast, Srimongol</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaLink className=" text-lg text-blue-500 mt-0.5" />
                                <p className="text-sm text-[#2c4964] font-semibold">Zoom Meeting</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className=" text-lg text-blue-500 mt-0.5" />
                                <p className="text-sm text-[#2c4964] font-semibold">{(selectedDate && selectTime) && moment(selectedDate).format('LL') + ' ' + selectTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Date Selection */}
                    <div className="w-full lg:w-2/5 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <h3 className="pb-2 mb-4 border-b border-gray-200 font-medium text-[#2c4964] text-base min-h-[60px]">
                            {selectedDate ? `Selected - ${moment(selectedDate).format('LL')}` : 'Pick a Date'}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {next6Days.map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleDateChange(item)}
                                    className="cursor-pointer"
                                >
                                    <div className={`p-3 rounded-lg text-center transition-all duration-600 ease-in border-2 
                                        ${moment(item).format('LL') === moment(selectedDate).format('LL') 
                                        ? 'bg-[#1977cc] text-white shadow-md' 
                                        : 'bg-white hover:bg-[#1977cc] border-[#1977cc] text-[#1977cc] hover:text-white'}`}
                                    >
                                        <div className="text-sm font-medium">{moment(item).format('MMMM YYYY')}</div>
                                        <div className="text-[22px] font-black py-1.5 my-1">{moment(item).format('D')}</div>
                                        <div className="text-sm">{moment(item).format('dddd')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Time Selection */}
                    <div className="w-full lg:w-1/3 p-4">
                        <h3 className="pb-2 mb-4 border-b border-gray-200 font-medium text-[#2c4964] text-base min-h-[60px]">
                            {selectTime 
                                ? `Selected - ${selectTime} to ${moment(selectTime, 'hh:mm A').add(30, 'minutes').format('hh:mm A')}` 
                                : 'Pick a Time'}
                        </h3>

                        {/* Morning Time Slots */}
                        <div className="mb-6">
                            <h4 className="text-[#2c4964] mb-2 text-base">Morning Time <span className="text-sm text-gray-500">(8AM - 12PM)</span></h4>
                            <div className="grid grid-cols-3 gap-2">
                                {amTimeSlot.map((item, id) => (
                                    <Button 
                                        key={id} 
                                        type={item === selectTime ? "primary" : "default"}
                                        size="small"
                                        className="w-full"
                                        onClick={() => handleSelectTime(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Afternoon Time Slots */}
                        <div>
                            <h4 className="text-[#2c4964] mb-2 text-base">Afternoon Time <span className="text-sm text-gray-500">(1PM - 5PM)</span></h4>
                            <div className="grid grid-cols-3 gap-2">
                                {pmTimeSlot.map((item, id) => (
                                    <Button 
                                        key={id} 
                                        type={item === selectTime ? "primary" : "default"}
                                        size="small"
                                        className="w-full"
                                        onClick={() => handleSelectTime(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectApppointment