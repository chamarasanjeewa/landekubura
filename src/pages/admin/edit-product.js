import { Breadcrumb, Form, Input, Button, Upload, Row, Col } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Select } from "antd";
import React from "react";
import { FileTextFilled, InboxOutlined } from "@ant-design/icons";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import axiosService from "./../../services/axiosService";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";

const schema = yup.object().shape({
  productName: yup.string().required("required")
});

const units = ["kilos", "units"];

const getProducts = async params => {
  const [id] = params.queryKey;
  const { data } = await axiosService.get("/api/products/" + id);
  return data;
};

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  }
};
const editProduct = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { isLoading, error, data } = pid
    ? useQuery(pid, getProducts)
    : { isLoading: false, error: null, data: null };

  const {
    formState,
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = data => {
    console.log(data);
    if (pid) {
      axiosService.put("/api/products/", { ...data, id: pid });
    } else {
      axiosService.post("/api/products/", data);
    }
    router.push("/admin/product-list");
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(JSON.stringify(data));


  return (
    <Container>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href={"/admin/product-list"}>
          <i className="fas fa-home" />
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="auth">
        <Row>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <h2>edit product</h2>
            <div className="auth-form">
              <Form
                layout="vertical"
                name="product"
                onFinish={handleSubmit(onSubmit)}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="product name">
                  <Controller
                    name="productName"
                    control={control}
                    defaultValue={data?.productName}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <p>{error?.productName?.message}</p>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
                <Form.Item label="cover image" name="coverImage">
                  <Controller
                    name="coverImage"
                    control={control}
                    defaultValue={data?.coverImage}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item label="quantity" name="quantity">
                  <Controller
                    name="quantity"
                    control={control}
                    defaultValue={data?.quantity}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item label="price" name="price">
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={data?.price}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item label="rate" name="rate">
                  <Controller
                    name="rate"
                    control={control}
                    defaultValue={data?.unit}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item label="unit" name="unit">
                  <Controller
                    name="unit"
                    control={control}
                    defaultValue={data?.unit}
                    render={({ field }) => (
                      <Select
                        {...field}
                      >
                        {units.map(x => (
                          <Select.Option value={x}>{x}</Select.Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
                <Form.Item label="description" name="description">
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={data?.shortDescription}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item label="long description" name="longdescription">
                  <Controller
                    name="longdescription"
                    control={control}
                    defaultValue={data?.fullDescription}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item className="form-submit">
                  <input type="submit" />
                  {/* <Button htmlType="submit">CREATE PRODUCT</Button> */}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <PartnerOne />
    </Container>
  );
};

export default editProduct;


