import { Table, Space, Button } from "antd";
import axiosService from "./../../services/axiosService";
import Container from "../../components/other/Container";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";
import link from "next/link";

//use react query and axios to get the products and add them to the grid

const getProducts = async () => {
  const { data } = await axiosService.get("/api/products");
  return data;
};
const listProduct = () => {
  const { isLoading, error, data } = useQuery("products-get", getProducts);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  console.log(JSON.stringify(data));
  const dataSource = [...data];

  const columns = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "cover image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: text => <a href={text}>{"cover image"}</a>
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href={"/admin/edit-product/?pid=" + record.slug}>Edit</a>
        </Space>
      )
    }
  ];

  return (
    <Container>
      <Button type={link}>
        <a href={"/admin/edit-product/"}>Create Product</a>
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </Container>
  );
};
export default listProduct;
