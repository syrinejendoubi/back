import React from "react";
import "./Login.css";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validateMessages = {
    required: "${label} est requis!",
    types: {
      email: "${label} n'est pas valide",
    },
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <h1 className="login-label">Login</h1>
        <br />
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="mot de passe"
          rules={[
            {
              required: true,
            },
            {
              min: 6,
              message: "mot de passe doit comporter au moins 6 caractères",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="mot de passe"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div style={{ marginTop: "5px" }}>
            Ou <a href="">inscrivez-vous!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
