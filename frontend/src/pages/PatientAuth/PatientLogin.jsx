import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import { message } from "antd";
// import { verifyRefreshToken } from "../../../backend/src/utils/jwt";

const Roles = [
  { title: "Doctor", key: "1" },
  { title: "Patient", key: "2" },
];

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    //console.log(values);
    setLoading(true);
    const patientData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/patient/login",
        patientData
      );
      message.success("Login Successful");
      console.log(response.data);

      // verifyRefreshToken(response.data.auth);
      navigate(`/patient/dashboard/${response.data.id}`);
    } catch (error) {
      console.error("Error:", error);
      message.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-40">
      <h1 className="text-center mb-8 text-3xl text-teal-900 font-semibold">
        Welcome to HealthDrive!
      </h1>
      <div className="justify-center flex">
        <Form
          className="w-1/2"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
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
              Donot have an account?{" "}
              <a href="/patient" className="font-semibold">
                Register Now
              </a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
