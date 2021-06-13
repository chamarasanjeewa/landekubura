import { Breadcrumb, Form, Input, Button, Checkbox, Row, Col,message } from "antd";
import Link from "next/link";
import React, { useState } from "react";

import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      setError("");
      setLoading(true);
      await login(values.username, values.password);
      message.success(" successfully logged in");
      router.replace("/");
    } catch (e) {
      console.log(e);
      message.error(e.message);
      setError("Failed to log in");
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    // <LayoutOne title="Login">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
        </Breadcrumb>
        <div className="auth">
          <Row>
            <Col xs={24} md={{ span: 12, offset: 6 }}>
              <h2>Login</h2>
              <div className="auth-form">
                <Form
                  layout="vertical"
                  name="login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username or email address"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!"
                      }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    className="form-functions"
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Button type="link">Forget your password</Button>
                  </Form.Item>
                  <Form.Item className="form-submit">
                    <Button type="default" htmlType="submit">
                      Signin
                    </Button>
                    <Button type="link">
                      <Link href={process.env.PUBLIC_URL + "/auth/register"}>
                        <a>OR CREATE AN ACCOUNT</a>
                      </Link>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
        <PartnerOne />
      </Container>
    // </LayoutOne>
  );
};

export default login;
