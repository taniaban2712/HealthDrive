import { Card } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Progress } from "antd";

const AppointmentCard = (appointment) => {
  console.log("appointmentcarddata", appointment);
  let date = new Date(appointment.appointment.date);
  let time = new Date(appointment.appointment.time);

  const appointmentDate = date.toDateString();
  const appointmentTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: true, // Use 12-hour format (AM/PM)
  });

  const [doctorData, setDoctorData] = useState([]);
  const doctorId = appointment.appointment.doctorId;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor/${doctorId}`)
      .then((response) => {
        //console.log('response',response.data)
        setDoctorData(response.data);
        console.log("doctor data", doctorData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [doctorId]);

  return (
    <div>
      <Card style={{ width: 300, height: 160 }} className="overflow-y-auto ">
        <p className="font-semibold">
          Patient Name: {appointment.appointment.patientName}
        </p>
        <p className="">Doctor Name: {doctorData.doctorName}</p>
        <p>Description: {appointment.appointment.description}</p>
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-xs">{appointmentDate}</p>
            <p className="text-xs">{appointmentTime}</p>
          </div>
          <div className="bg-orange-600 w-3 h-3 rounded-full"></div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentCard;
