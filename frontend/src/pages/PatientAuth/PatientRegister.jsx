import React from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const bloodGroupItems = [
  { title: "A+", key: "1" },
  { title: "A-", key: "2" },
  { title: "B+", key: "3" },
  { title: "B-", key: "4" },
  { title: "O+", key: "5" },
  { title: "O-", key: "7" },
  { title: "AB+", key: "8" },
  { title: "AB-", key: "9" },
];

const genderItems = [
  { title: "Female", key: "1" },
  { title: "Male", key: "2" },
  { title: "Other", key: "3" },
];

const Roles = [
  { title: "Doctor", key: "1" },
  { title: "Patient", key: "2" },
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("authToken"); // Check if user is logged in (token present)
    const id = sessionStorage.getItem("id");
    
  
    useEffect(() => {
      if (token && id) {
        navigate(`/patient/dashboard/${id}`);
      }
      else{
        navigate('/patient');
      }
    }, [token, id,navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    const patientData = {
      name: values.name,
      bloodGroup: values.bloodGroup,
      email: values.email,
      gender: values.gender,
      password: values.password,
      contactNumber: parseInt(values.contactNumber),
      age: parseInt(values.age),
    };
    //console.log(patientData);

    try {
      // Send data to the backend using axios POST request
      const response = await axios.post(
        "http://localhost:3000/patient",
        patientData
      );

      // If the request is successful, show success message
      message.success("Data submitted successfully!");
      const sendEmail=await axios.post(
        "http://localhost:3000/patient/sendmail",
        {email:`${patientData.email}`}
      )
      console.log(patientData); // You can log the response from the backend if needed
    } catch (error) {
      // If an error occurs, show an error message
      if(error.status==400){
        message.error("User Already Exists!");
      }
      else message.error("There was an error submitting the form");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false once the request is completed
      navigate("/patient/login"); // Redirect to the login page
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Patient cannot be registered");
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-20">
      <h1 className="text-center mb-8 text-3xl text-teal-900 font-semibold">
        Welcome to HealthDrive!
      </h1>
      <div className="justify-center flex">
        <Form
          className="w-1/2"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input your Contact Number!",
              },
              // {
              //   min: 100000000,
              //   message: "Contact Number must be 10 digits",
              // },
              // {
              //   max: 9999999999,
              //   message: "Contact Number must be 10 digits",
              // },
            ]}
          >
            <Input placeholder="Contact Number" />
          </Form.Item>
          <div className="flex gap-4 w-full">
            <Form.Item
              label="Age"
              name="age"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please input your age!",
                },
                {
                  min: 0,
                  message: "Age cannot be negative",
                },
                {
                  max: 120,
                  message: "Age cannot be more than 120",
                },
              ]}
            >
              <Input placeholder="Age" />
            </Form.Item>
            <Form.Item
              label="Blood Group"
              name="bloodGroup"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please choose your blood group!",
                },
              ]}
            >
              <Select placeholder="Select a blood group" allowClear>
                {bloodGroupItems.map((item) => (
                  <div key={item.title}>{item.title}</div>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please choose your gender!",
              },
            ]}
          >
            <Select placeholder="Select a gender" allowClear>
              {genderItems.map((item) => (
                <div key={item.title}>{item.title}</div>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
              { max: 12, message: "Password must be less than 12 characters!" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {/* <Form.Item
            label="Role"
            name="role"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please choose your role!",
              },
            ]}
          >
            <Select placeholder="Select a role" allowClear>
              {Roles.map((item) => (
                <div key={item.title}>{item.title}</div>
              ))}
            </Select>
          </Form.Item> */}

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-teal-900 items-center text-white font-semibold"
            >
              Submit
            </Button>
            <p className="text-center mt-3">
              Already an existing user?{" "}
              <a href="/patient/login" className="font-semibold">
                Login
              </a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
