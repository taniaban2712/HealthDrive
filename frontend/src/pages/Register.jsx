import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";

const onFinish = (values) => {
  const patientData={
    name:values.name,
    bloodGroup:values.bloodGroup,
    email: values.email,
    gender: values.gender,
    password: values.password,
    contactNumber: parseInt(values.contactNumber),
    age: parseInt(values.age),
  }
  console.log(patientData);

  
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

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

const Register = () => {
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
              <Select>
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
            <Select>
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
            ]}
          >
            <Input.Password />
          </Form.Item>

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
              <a href="/login" className="font-semibold">
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
