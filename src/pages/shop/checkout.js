import React, { useState } from "react";
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
import { useRouter } from "next/router"
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopOrderStep from "../../components/shop/ShopOrderStep";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { useAuth, currentUser } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { addUser, updateUser } from "./../../services/userService";
import { fetchUserData } from "./../../services/userService";
import { useQuery, useQueryClient, useMutation } from "react-query";

function checkout() {
  const { currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();
  const { cartProducts, totalPrice } = useCart();
  const {
    isLoading,
    error: err,
    data
  } = useQuery("current-user", () => fetchUserData(currentUser.uid), {});
  // const updateUserMutation = useMutation(user => updateUser(user), {
  //   onSuccess: (data, variables, context) => {
  //     // Boom baby!
  //     console.log("boom baby!");
  //     // queryClient.invalidateQueries('cart-products')
  //   }
  // });
  const addUserMutation = useMutation(user => addUser(user), {
    onSuccess: (data, variables, context) => {
      // Boom baby!
      console.log("boom baby!");
      // queryClient.invalidateQueries('cart-products')
    }
  });

  const onFinish = values => {
    //insert user if not exists
    const user = {


                userId: currentUser.uid,
      
      
      email:   currentUser.email,
     
     
      ...values
   
   
    };
    addUserMutation.mutate(user);
    //add order
    //send email
    router.push("/shop/order-complete");
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const onChoosePaymentMethod = e => {
    setPaymentMethod(e.target.value);
  };
   if (isLoading) return "loading.....";
   console.log(data?.data);
   const user = data?.data;
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
                        initialValue={user?.firstname}
                        rules={[
                          {
                            required: true,
                            message: "Please input your first name!"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Last name"
                        name="lastname"
                        initialValue={user?.lastname}
                        rules={[
                          {
                            required: true,
                            message: "Please input your last name!"
                          }
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
                        initialValue={user?.street}
                        name="street"
                        rules={[
                          {
                            required: true,
                            message: "Please input your street addres!"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Postcode / ZIP (optional)" name="zip">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Town / City"
                        name="city"
                        initialValue={user?.city}
                        rules={[
                          {
                            required: true,
                            message: "Please input your Town/City!"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Phone"
                        name="phone"
                        initialValue={user?.phone}
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone!"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        initialValue={user?.email                               ??                               currentUser?.email}
                        label="Email address"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email address!"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                      <Form.Item name="other-address">
                        <h3 className="checkout-title">Shipping Address</h3>
                        <Checkbox>Ship to a different address?</Checkbox>
                      </Form.Item>
                    </Col> */}
                    <Col span={24}>
                      <Form.Item
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                                      label="Order notes (optional)"
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                                      name="note"
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                                      initialValue={data?.notes}
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      >
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
                    {cartProducts?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.productName} x {item.cartQuantity}
                        </td>
                        <td className="-bold ">
                          {formatCurrency(item.price * item.cartQuantity)}
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                      <th>SUBTOTAL</th>
                      <td className="-bold -color">
                        {totalPrice}
                      </td>
                    </tr> */}
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
                        {totalPrice}
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
