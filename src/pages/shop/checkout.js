import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Radio,
  Breadcrumb,
} from "antd";
import { useRouter } from "next/router";

import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopOrderStep from "../../components/shop/ShopOrderStep";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { useAuth } from "../../context/AuthContext";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";
import axiosService from "./../../common/axiosService";


const getProducts = async params => {
  const { data } = await axiosService.get("/api/cart/");
  return data;
};

const getUser = async params => {
  const { data } = await axiosService.get("/api/users/"+params);
  return data;
};

function checkout() {
  const { currentUser, logout } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();
  const queryClient=useQueryClient();
const data = queryClient.getQueryData("cart-products");

//const { isLoading, error, data }=useQuery('cart-products', getProducts)
const { isLoading, error, data:userData }=useQuery('get-user',()=>{getUser(currentUser.uid)} )
console.log(userData);
  //const cartState = useSelector((state) => state.cartReducer);
  const onFinish = (values) => {
    //insert user if not exists
    //add order
    //send email
    router.push("/shop/order-complete");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChoosePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  // if(isLoading) return "loading....."
  return (
    <LayoutOne title="Checkout">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Checkout</Breadcrumb.Item>
        </Breadcrumb>
        <ShopOrderStep current={2} />
        {/* <FetchDataHandle
          emptyDescription="No product in cart"
          data={cartState}
          renderData={(data) => ( */}
            <div className="checkout">
              <Row gutter={50}>
                <Col xs={24} md={16}>
                  <div className="checkout-form">
                    <h3 className="checkout-title">Billing details</h3>
                    <Form
                      name="checkout"
                      layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      id="checkout-form"
                    >
                      <Row gutter={15}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="First name"
                            name="firstname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your first name!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="Last name"
                            name="lastname"
                            rules={[
                              {
                                required: true,
                                message: "Please input your last name!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        {/* <Col span={24}>
                          <Form.Item
                            label="Company name (optional)"
                            name="company"
                          >
                            <Input />
                          </Form.Item>
                        </Col> */}
                        {/* <Col span={24}>
                          <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: "Please choose your country!",
                              },
                            ]}
                          >
                            <Select defaultValue="vietnam">
                              <Select.Option value="vietnam">
                                vietnam
                              </Select.Option>
                              <Select.Option value="usa">USA</Select.Option>
                              <Select.Option value="japan">japan</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col> */}
                        <Col span={24}>
                          <Form.Item
                            label="Street address"
                            name="street"
                            rules={[
                              {
                                required: true,
                                message: "Please input your street addres!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Postcode / ZIP (optional)"
                            name="zip"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Town / City"
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Town/City!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item initialValue={userData?.email}
                            label="Email address"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email address!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="other-address">
                            <h3 className="checkout-title">Shipping Address</h3>
                            <Checkbox>Ship to a different address?</Checkbox>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Order notes (optional)" name="note">
                            <Input.TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="checkout-total">
                    <h3 className="checkout-title">Your order</h3>
                    <table className="checkout-total__table">
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.productName} x {item.cartQuantity}
                            </td>
                            <td className="-bold ">
                              {formatCurrency(item.price * item.cartQuantity)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <th>SUBTOTAL</th>
                          <td className="-bold -color">
                            {formatCurrency(calculateTotalPrice(data))}
                          </td>
                        </tr>
                        {/* <tr>
                          <th>SHIPPING</th>
                          <td>
                            <p>Free shipping</p>
                            <p>Calculate shipping</p>
                          </td>
                        </tr> */}
                        <tr>
                          <th>Total</th>
                          <td
                            style={{ fontSize: 20 / 16 + "em" }}
                            className="-bold -color"
                          >
                            {formatCurrency(calculateTotalPrice(data))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="checkout-total__footer">
                      <Radio.Group
                        onChange={onChoosePaymentMethod}
                        value={paymentMethod}
                      >
                        <Radio style={{ display: "block" }} value="cod">
                          Cash on delivery
                        </Radio>
                        {/* <Radio style={{ display: "block" }} value="paypal">
                          Paypal
                        </Radio> */}
                      </Radio.Group>
                    </div>
                    <Button
                      className="checkout-sumbit"
                      type="default"
                      shape="round"
                      form="checkout-form"
                      key="submit"
                      htmlType="submit"
                    >
                      <a>Place order</a>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          {/* )}
        /> */}
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
}

export default React.memo(checkout);
