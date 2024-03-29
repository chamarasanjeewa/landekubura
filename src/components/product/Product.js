import React, { useState } from "react";
import { Button, message, Rate, Tooltip, Modal } from "antd";
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import classNames from "classnames";
import { formatCurrency } from "../../common/utils";
import QuantitySelector from "../../components/other/QuantitySelector";
import { useAuth } from "../../context/AuthContext";
import { useUpdateCart, useCart } from "../../context/CartContext";
import ProductDetailLayout from "../detail/product/ProductDetailLayout";

function Product({ data, className, type, countdownLast = 100000000 }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { currentUser } = useAuth();
  const { setProductQty } = useUpdateCart();
  const { cartProducts } = useCart();
  const alreadyInCart = cartProducts.find(x => x.id === data.slug);
  const quantitySelectorDefaultVal = alreadyInCart
    ? alreadyInCart.cartQuantity
    : 0;

  const showModal = () => {
    setModalVisible(true);
  };

  const onModalClose = e => {
    setModalVisible(false);
  };

  const onAddToCart = product => {
    if (addToCartLoading) {
      return;
    }
    setAddToCartLoading(true);
    setProductQty({
      product: {
        productName: product.productName,
        id: product.slug,
        coverImage: product.coverImage,
        cartQuantity: product.quantity,
        price: product.price,
        userId: currentUser.uid
      },
      qty: 1
    });
    console.log("....cartProducts...", cartProducts);
    // updateMutation.mutate({
    //   productName: product.productName,
    //   id: product.slug,
    //   coverImage: product.coverImage,
    //   cartQuantity: product.quantity,
    //   price: product.price,
    //   userId: currentUser.uid
    // });
    message.success("Product added to cart");
    setAddToCartLoading(false);
  };

  const onChangeQuantity = (product, qty) => {
    setProductQty({ product: product, qty: qty });
  };

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const rederProductType = type => {
    switch (type) {
      case "tiny":
        return (
          <div className={`product-tiny ${classNames(className)}`}>
            <div className="product-tiny-img">
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a title={data.name}>
                  <img src={data.coverImage} alt="Product image" />
                </a>
              </Link>
            </div>
            <div className="product-tiny-content">
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a className="product-tiny-name" title="Pure Pineapple">
                  {data.name}
                </a>
              </Link>
              <h3 className="product-tiny-price">
                {data.discount
                  ? formatCurrency(data.price - data.discount)
                  : formatCurrency(data.price)}
                {data.discount && <del>{formatCurrency(data.price)}</del>}
              </h3>
            </div>
          </div>
        );
      case "dale":
        return (
          <div className={`product-dale ${classNames(className)}`}>
            <div className="product-dale-img">
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a title={data.name}>
                  <img src={data.coverImage} alt="Product image" />
                </a>
              </Link>
            </div>
            <Countdown
              date={Date.now() + getRandomArbitrary(100000000, 150000000)}
              renderer={({ days, hours, minutes, seconds }) => {
                return (
                  <div className="product-dale-countdown">
                    <div className="product-dale-countdown-item">
                      <h6>{zeroPad(days)}</h6> <span>days</span>
                    </div>
                    <div className="product-dale-countdown-item">
                      <h6>{zeroPad(hours)}</h6> <span>hr</span>
                    </div>
                    <div className="product-dale-countdown-item">
                      <h6>{zeroPad(minutes)} </h6>
                      <span>min</span>
                    </div>
                    <div className="product-dale-countdown-item">
                      <h6>{zeroPad(seconds)}</h6> <span>sec</span>
                    </div>
                  </div>
                );
              }}
            />
            <div className="product-dale-content">
              <h5 className="product-dale-type">{data.category}</h5>
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a className="product-dale-name" title="Pure Pineapple">
                  {data.name}
                </a>
              </Link>
              <h3 className="product-dale-price">
                {data.discount
                  ? formatCurrency(data.price - data.discount)
                  : formatCurrency(data.price)}
                {data.discount && <del>{formatCurrency(data.price)}</del>}
              </h3>
            </div>
          </div>
        );
      case "list":
        return (
          <div className="product-list">
            <div className="product-img">
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a title={data.name}>
                  <img src={data.coverImage} alt="Product image" />
                </a>
              </Link>
              <Button type="primary" onClick={showModal}>
                Quick view
              </Button>
            </div>
            <div className="product-list-content">
              <h5 className="product-type">{data.category}</h5>
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a className="product-name" title="Pure Pineapple">
                  {data.name}
                </a>
              </Link>
              <Rate
                className="product-rate"
                disabled
                defaultValue={data.rate}
              />
              <p className="product-description">{data.description}</p>
              {data.quantity > 0 ? (
                <h5 className="product-availability -instock">
                  Availability: <span> {data.quantity} in stock</span>
                </h5>
              ) : (
                <h5 className="product-availability -outstock">
                  Availability: <span> Out stock</span>
                </h5>
              )}
            </div>
            <div className="product-list-actions">
              <div className="product-detail-content__delivery">
                Free delivery
              </div>
              <h3 className="product-detail-content__price">
                {data.discount && <del>{formatCurrency(data.price)}</del>}
                <div className="product-detail-content__price-discount">
                  <h5>
                    {data.discount
                      ? formatCurrency(data.price - data.discount)
                      : formatCurrency(data.price)}
                  </h5>
                </div>
              </h3>
              <div className="product-detail-content__actions">
                {/* <Button
                  onClick={() => onAddToCart(data)}
                  loading={addToCartLoading}
                  shape="round"
                >
                  Add to cart
                </Button> */}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`product ${classNames(className)}`}>
            <div className="product-img">
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a title={data.name}>
                  <img src={data.coverImage} alt="Product image" />
                </a>
              </Link>
            </div>
            <div className="product-content">
              <a className="product-name" title="Pure Pineapple">
                {data.productName}
              </a>
              <h3>{formatCurrency(data.price)}</h3>
              {/* <h3 className="product-price">
                {data.discount
                  ? formatCurrency(data.price - data.discount)
                  : formatCurrency(data.price)}
                {data.discount && <del>{formatCurrency(data.price)}</del>}
              </h3> */}

              <QuantitySelector
                max={30}
                min={0}
                onChange={val => onChangeQuantity(data, val)}
                defaultValue={quantitySelectorDefaultVal}
              />
              {/* <h5 className="product-type">{data.category}</h5>
              <Link
                href={process.env.PUBLIC_URL + `/product/[slug]`}
                as={process.env.PUBLIC_URL + `/product/${data.slug}`}
              >
                <a className="product-name" title="Pure Pineapple">
                  {data.name}
                </a>
              </Link> */}
            </div>

            {/* <div>
              <QuantitySelector
                onChange={val => setCurrentQuantity(val)}
                max={5}
              />
            </div> */}
            {/* <div className="product-select"> */}
            {/* <Tooltip title="Add to wishlist">
                <Button
                  onClick={() => onAddWishlist(data)}
                  className={`product-btn ${classNames({
                    active: productInWishlist
                  })}`}
                  type="primary"
                  shape="round"
                  icon={
                    addToWishlistLoading ? (
                      <LoadingOutlined spin />
                    ) : (
                      <i className="far fa-heart" />
                    )
                  }
                />
              </Tooltip> */}
            {/* <Tooltip title="Add to cart">
                <Button
                  onClick={() => onAddToCart(data)}
                  className="product-btn"
                  type="primary"
                  shape="round"
                  icon={
                    addToCartLoading ? (
                      <LoadingOutlined spin />
                    ) : (
                      <i className="far fa-shopping-bag" />
                    )
                  }
                />
              </Tooltip> */}
            {/* <Tooltip title="Add to compare">
                <Button
                  onClick={() => onAddToCompare(data)}
                  className={`product-btn ${classNames({
                    active: productInCompare
                  })}`}
                  type="primary"
                  shape="round"
                  icon={<i className="far fa-random" />}
                />
              </Tooltip> */}
            {/* <Tooltip title="Quick view">
                <Button
                  onClick={showModal}
                  className="product-btn"
                  type="primary"
                  shape="round"
                  icon={<i className="far fa-eye" />}
                />
              </Tooltip> */}
            {/* </div> */}
          </div>
        );
    }
  };
  return (
    <>
      {rederProductType(type)}
      <Modal
        visible={modalVisible}
        onCancel={onModalClose}
        footer={null}
        header={null}
        width={860}
      >
        <ProductDetailLayout style={{ marginBottom: 0 }} hideTab data={data} />
      </Modal>
    </>
  );
}

export default React.memo(Product);
