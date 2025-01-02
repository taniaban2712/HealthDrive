import React from "react";
import { useState, useEffect } from "react";
import { Header } from "antd/es/layout/layout";
import { Drawer } from "antd";
import AddIcon from "@mui/icons-material/Add";
import AddAppointmentCard from "../../components/AddAppointmentCard";
import axios from "axios";
import AppointmentCard from "../../components/AppointmentCard";

const Appointments = (data) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/appointment`)
      .then((response) => {
        //console.log('response',response.data)
        setAppointmentData(response.data);
        console.log("appointment data", appointmentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);

  useEffect(() => {
    // Initialize or reset the appointment categories on each render
    const approved = [];
    const rejected = [];
    const pending = [];

    // Loop through the appointments to categorize them
    appointmentData.forEach((appointment) => {
      if (appointment.status === "Approved") {
        approved.push(appointment);
      } else if (appointment.status === "Rejected") {
        rejected.push(appointment);
      } else {
        pending.push(appointment);
      }
    });

    // Update the state once with the categorized data
    setApprovedAppointments(approved);
    setRejectedAppointments(rejected);
    setPendingAppointments(pending);
  }, [appointmentData]);

  console.log("Approved Appointments", approvedAppointments);
  console.log("Rejected Appointments", rejectedAppointments);
  console.log("Pending Appointments", pendingAppointments);

  return (
    <div>
      <div>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "76%",
          }}
          className="md:w-3/4 bg-gray-200 flex justify-between items-center p-6"
        >
          <h1 className="text-lg">Appointments</h1>
          <button
            className="flex items-center gap-2 bg-[#4c7450] h-10 w-52 pl-4 text-white"
            onClick={showDrawer}
          >
            <AddIcon />
            <p> Add new Appointment</p>
          </button>
        </Header>
        <Drawer
          title="Add new Appointment"
          placement="right"
          open={open}
          onClose={onClose}
          width={500}
        >
          <AddAppointmentCard patientData={data.data} />
        </Drawer>
      </div>

      {/* Appointment Cards */}
      {/*APPROVED APPOINTMENTS*/}

      <div>
        {approvedAppointments.length > 0 ? (
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-lg">Approved Appointments</h1>
            {approvedAppointments.map((appointment, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md flex gap-4"
              >
                <div>
                  <h1 className="text-lg font-semibold">
                    {appointment.doctorName}
                  </h1>
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                </div>
                <div>
                  <p>{appointment.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* PENDING APPOINTMENTS */}
      <div className="flex flex-col gap-4 pt-14">
        {pendingAppointments.length > 0 ? (
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-lg">Pending Appointments</h1>
          {pendingAppointments.map((appointment, index) => (
           <AppointmentCard key={index} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div></div>
      )}

      </div>
      {/* REJECTED APPOINTMENTS */}
    </div>
  );
};

export default Appointments;
