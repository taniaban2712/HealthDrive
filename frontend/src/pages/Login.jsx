import React from 'react'
import { Button, Checkbox, Form, Input, Select } from "antd";

const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

const Login = () => {
  return (
    <div className="mt-40">
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
            <Input.Password placeholder='Password'/>
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
              Donot have an account?{" "}
              <a href="/" className="font-semibold">
                Register Now
              </a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login