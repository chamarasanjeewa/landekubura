import { Table, Space, Button } from "antd";
import axiosService from "../../services/axiosService";
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

const getOrders = async () => {
  const { data } = await axiosService.get("/api/order");
  return data;
};
const listOrders = () => {
  const { isLoading, error, data } = useQuery("orders-get", getOrders);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  console.log(JSON.stringify(data));
  const dataSource = [...data];

  const expandedRowRender = (record, index, indent, expanded) => {
    const productColumns = [
      { title: "productName", dataIndex: "productName", key: "productName" },
      {
        title: "cover image",
        dataIndex: "coverImage",
        key: "coverImage",
        render: text => <a href={text}>{"cover image"}</a>
      },
      { title: "cartQuantity", dataIndex: "cartQuantity", key: "cartQuantity" },
      { title: "price", dataIndex: "price", key: "price" }
    ];
    [];
    console.log("data source....", record);
    const data = record.products;

    return (
      <Table
        rowKey={record => record.orderId}
        columns={productColumns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "orderId",
      dataIndex: "orderId",
      key: "orderId"
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "user",
      dataIndex: "userId",
      key: "userId"
    },

    {
    title: "Action",
    key: "action",
    render: (text, record) => (
    <Space size="middle">
      <a href={"/order/edit-order/?pid=" + record.slug}>Edit</a>
    </Space>
    )
    }
  ];

  return (
    <Container>
      {/* <Button type={link}>
        <a href={"/admin/edit-order/"}>Create Product</a>
      </Button> */}
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender: expandedRowRender,
          defaultExpandAllRows: false
        }}
      />
    </Container>
  );
};
export default listOrders;
