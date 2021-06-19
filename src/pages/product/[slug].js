import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

import { fetchProductDetailRequest } from "../../redux/actions/shopActions";
import LayoutOne from "../../components/layout/LayoutOne";
import ProductDetailLayout from "../../components/detail/product/ProductDetailLayout";
import Container from "../../components/other/Container";
import ShopSidebar from "../../components/shop/ShopSidebar";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import FetchDataHandle from "../../components/other/FetchDataHandle";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";
import axiosService from "./../../services/axiosService";

const getProducts = async params => {
  const [id] = params.queryKey;
  const { data } = await axiosService.get("/api/products/" + id);
  return data;
};

function productDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { isLoading, error, data } = useQuery(slug, getProducts);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <LayoutOne title="Product detail">
      <div className="product-detail">
        <Container>
          <Row gutter={30}>
            {/* <Col xs={24} md={6}>
              <ShopSidebar showShortcut />
            </Col> */}
            <Col xs={24} md={18}>
                  <ProductDetailLayout data={data} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
}

export default React.memo(productDetail);
