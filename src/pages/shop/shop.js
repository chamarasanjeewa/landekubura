import React, { useState } from "react";
import { Col, Row, Pagination, Breadcrumb } from "antd";
import { useRouter } from "next/router";
import LayoutFive from "../../components/layout/LayoutFive";
import Container from "../../components/other/Container";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ProductGrid from "../../components/sections/product-thumb/ProductGrid";
import ShopHeader from "../../components/shop/ShopHeader";
import { useQuery } from "react-query";
import { getProducts } from "../../services/shopService";

function shopGrid3Column() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const  view ="";
  //const shopFilterState = useSelector(state => state.shopFilterReducer);
  //const { sort, show, view, category, color, size, tag } = shopFilterState;
  const { isLoading, error, data } = useQuery("products", getProducts);
  if (isLoading) return 'loading....'
//sync product with cart

  // const onPaginationChange = current => {
  //   setCurrentPage(current);
  // };
  return (
    <LayoutFive title="Shop grid fullwidth">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
        </Breadcrumb>
        <div className="shop">
          <div className="shop-content">
            <Row gutter={30}>
              <Col xs={24} lg={6}>
                <ShopSidebar style={{ marginTop: 10 / 16 + "em" }} />
              </Col>
              <Col xs={24} lg={18}>
                <ShopHeader title="Currently in store" />
                <ProductGrid
                  data={data}
                  hideHeader
                  productCol={
                    view === "list"
                      ? { xs: 24, sm: 12, md: 24 }
                      : { xs: 12, sm: 12, md: 8, lg: 8 }
                  }
                  productType={view}
                />
                {data?.count > 0 && (
                  <Pagination
                    onChange={onPaginationChange}
                    defaultCurrent={currentPage}
                    pageSize={show}
                    total={products.count}
                  />
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </LayoutFive>
  );
}

export default React.memo(shopGrid3Column);
