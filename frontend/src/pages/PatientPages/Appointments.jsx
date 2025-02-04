import React from "react";
import { useState, useEffect } from "react";
import { Header } from "antd/es/layout/layout";
import { Drawer } from "antd";
import AddIcon from "@mui/icons-material/Add";
import AddAppointmentCard from "../../components/AddAppointmentCard";
import axios from "axios";
import AppointmentCard from "../../components/AppointmentCard";
import EditAppointmentCard from "../../components/EditAppointmentCard";

const Appointments = (data) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment]=useState([]);

  const time = new Date().getHours();
  console.log("nowtime", time);

  let greeting = "";
  if (time < 12) greeting = "Morning";
  else if (time >= 12 && time <= 16) greeting = "Afternoon";
  else greeting = "Evening";

  const patientId = data.data._id;
  const showDrawer = () => {
    setOpen(true);
    console.log("Drawer Open");
  };
  const showEditDrawer = (appointmentData) => {
    setEditOpen(true);
    console.log("carddata",appointmentData)
    setSelectedAppointment(appointmentData);
    console.log("Drawer Open");
  };
  const onClose = () => {
    setOpen(false);
    console.log("Drawer Closed");
  };
  const onEditClose = () => {
    setEditOpen(false);
    setSelectedAppointment([]);
    console.log("Drawer Closed");
  };

  const [appointmentData, setAppointmentData] = useState([]);
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/appointment/patient/${patientId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log('response',response.data)
        setAppointmentData(response.data);
        console.log("appointment data", appointmentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [patientId]);

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

  approvedAppointments.sort((appointment1, appointment2) => {
    if (appointment1.date != appointment2.date)
      return appointment1.date - appointment2.date;
    return appointment1.time - appointment2.time;
  });

  console.log("Approved Appointments", approvedAppointments);
  console.log("Rejected Appointments", rejectedAppointments);
  console.log("Pending Appointments", pendingAppointments);

  return (
    <div>
      <div>
        <Header
          style={{
            zIndex: 1,
            width: "100%",
          }}
          className="md:w-3/4 bg-gray-200 flex justify-between items-center p-6"
        >
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <button
            className="flex items-center gap-2 bg-[#4c7450] h-10 w-52 pl-4 text-white"
            onClick={showDrawer}
          >
            <AddIcon />
            <p className=""> Add new Appointment</p>
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
        <Drawer
          title="Edit Appointment"
          placement="right"
          open={editOpen} // Controlled by the state `editOpen`
          onClose={onEditClose} // This triggers `onEditClose` to set `editOpen` to `false`
          width={500}
        >
          <EditAppointmentCard appointmentData={selectedAppointment} />
        </Drawer>
      </div>

      <p className="p-2 text-3xl pt-3 text-[#4c7450] font-semibold">
        Good {greeting}, {data.data.name}!
      </p>

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
      <div className="flex flex-col gap-4 ">
        {pendingAppointments.length > 0 ? (
          <div className="flex flex-col gap-4 p-2">
            <h1 className="text-lg">Pending Appointments</h1>
            <div className="flex flex-wrap gap-1">
              {pendingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="cursor-pointer" // This makes the card clickable
                  onClick={()=>showEditDrawer(appointment)} // Pass appointment data to the handler
                >
                  <AppointmentCard appointment={appointment} />
                </div>
              ))}
            </div>
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
