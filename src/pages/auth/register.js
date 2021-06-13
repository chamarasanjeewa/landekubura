import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import axiosService from "./../../common/axiosService";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";

const register = () => {
  const { signup } = useAuth();
  const insertUserMutation = useMutation(user => axiosService.post('/api/users', user))

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    debugger;
    try {
      setError("");
      setLoading(true);
     const user=await signup(values.username, values.password);
     const res=  insertUserMutation.mutate({userId:user.uid,email:values.username});
     debugger;
      console.log("Success:", values);
      message.success("Registered successfully");
      router.push("/auth/login");
    } catch (e) {
      message.error(e.message);
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  return (
    // <LayoutOne title="Register">
    <Container>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <i className="fas fa-home" href={"/products/products-list"} />
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Register</Breadcrumb.Item>
      </Breadcrumb>
      <div className="auth">
        <Row>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <h2>Register new account</h2>
            <div className="auth-form">
              <Form
                layout="vertical"
                name="register"
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
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item className="form-submit">
                  <Button type="default" htmlType="submit">
                    Register
                  </Button>
                  <Button type="link">
                    <Link href={process.env.PUBLIC_URL + "/auth/login"}>
                      <a>OR Login</a>
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

export default register;
