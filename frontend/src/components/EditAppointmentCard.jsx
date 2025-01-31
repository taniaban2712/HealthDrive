import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  message,
  Select,
  Checkbox,
  Button,
  DatePicker,
  TimePicker,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const EditAppointmentCard = (appointmentData) => {
  console.log(appointmentData.appointmentData);
  const appointmentId=appointmentData.appointmentData._id;
  console.log(appointmentId);
  const [doctorId, setDoctorId] = useState(null);
  const disablePastDates = (current) => {
    // Disable dates before today
    return current && current.isBefore(dayjs().startOf("day"), "day");
  };
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctor`)
      .then((response) => {
        //console.log('response',response.data)
        setDoctorData(response.data);
        console.log("doctor data", doctorData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [doctorId]);

  const token=sessionStorage.getItem('authToken');
  const onFinish = async (values) => {
    
    const appointmentData = {
      patientId: patientId,
      patientName: values.patientName,
      patientEmail: values.patientEmail,
      patientContact: parseInt(values.patientContact),
      doctorId: doctorId,
      date: values.date,
      time: values.time,
      description: values.description,
    };
    console.log(appointmentData);

    try {
      const response = await axios.patch(
        `http://localhost:3000/appointment/add/${appointmentId}`,
        appointmentData,
        {headers: { authorization: `Bearer ${token}`}}
      );
      message.success("Appointment Edited successfully!");
      location.reload();
    } catch (error) {
      message.error("There was an error adding the appointment");
      console.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card>
        <Form
          initialValues={{
            patientName: appointmentData.appointmentData.patientName,
            patientContact: appointmentData.appointmentData.patientContact,
            patientEmail: appointmentData.appointmentData.patientEmail,
            description: appointmentData.appointmentData.description,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Patient Name"
            name="patientName"
            rules={[
              {
                required: true,
                message: "Please input the patient name!",
              },
            ]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            label="Patient Email"
            name="patientEmail"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>

          <Form.Item
            label="Patient Contact"
            name="patientContact"
            rules={[{ required: true, message: "Please input the contact!" }]}
          >
            <Input placeholder="Enter Your Contact Number" />
          </Form.Item>
          <Form.Item
            label="Doctor Name:"
            name="doctorId"
            rules={[{ required: true, message: "Please select the doctor!" }]}
          >
            <Select
              placeholder="Select the doctor"
              allowClear
              onChange={(value) => setDoctorId(value)}
            >
              {doctorData.map((doctor) => (
                <div key={doctor._id}>{doctor.doctorName}</div>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Appointment Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker
              disabledDate={disablePastDates}
              allowClear
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="Appointment Time"
            name="time"
            rules={[{ required: true, message: "Please select the time!" }]}
          >
            <TimePicker format="HH:mm" minuteStep={15} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Symptoms"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter your Symptoms" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full text-white bg-green-950"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditAppointmentCard;
