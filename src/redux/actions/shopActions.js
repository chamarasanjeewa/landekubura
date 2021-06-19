import { SHOP } from "../actionTypes";
import * as shopApis from "../../services/shopService";

//Get all products
export const fetchProducts = () => ({
  type: SHOP.FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (data, productCount) => ({
  type: SHOP.FETCH_PRODUCTS_SUCCESS,
  payload: {
    data,
    productCount,
  },
});

export const fetchProductsFail = (err) => ({
  type: SHOP.FETCH_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const insertProducts = () => ({
  type: SHOP.INSERT_PRODUCT
});

export const insertProductsSuccess = (data, productCount) => ({
  type: SHOP.INSERT_PRODUCTS_SUCCESS,
  payload: {
    data,
    productCount
  }
});

export const insertProductsFail = err => ({
  type: SHOP.INSERT_PRODUCTS_FAIL,
  payload: {
    err
  }
});

export const fetchProductsRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchProducts());
    shopApis
      .fetchProductsData(query)
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data, res.headers["x-total-count"]));
      })
      .catch((err) => {
        dispatch(fetchProductsFail(err));
      });
  };
};

export const insertProduct = data => {
  const product = {
    fullDescription:
      "Last but not least, we couldn’t write a post on blogs to follow on sustainable living without mentioning our very own blog, The Organic society. Our mission is to inspire families to eat well, do good and live better. Our blog covers all things organic, from food to farming, health and wellness to fashion and beauty",
    price: "100",
    name: "Fresh potato",
    shortDescription:
      "Your first step to sustainable living is going zero waste and what better way to start then starting at home",
    rate: "4",
    coverImage: "/assets/images/products/potato.jpg",
    images: [
      "/assets/images/products/potato.jpg",
      "/assets/images/products/brinjals.jpg",
      "/assets/images/products/cabbage.jpg"
    ],
    quantity: "8",
    discount: "3"
  };
  debugger;
  shopApis
    .insertProductsData(product)
    .then(res => {
      console.log(res);
      //dispatch(insertProductsSuccess(res.data, res.headers["x-total-count"]));
    })
    .catch(err => {
      console.log("error");
      //  dispatch(insertProductsFail(err));
    });
  // return dispatch => {
  //   dispatch(insertProducts());
  //   shopApis
  //     .insertProductsData(product)
  //     .then(res => {
  //       dispatch(insertProductsSuccess(res.data, res.headers["x-total-count"]));
  //     })
  //     .catch(err => {
  //       dispatch(insertProductsFail(err));
  //     });
  // };
};

//Get sale products
export const fetchSaleProducts = () => ({
  type: SHOP.FETCH_SALE_PRODUCTS,
});

export const fetchSaleProductsSuccess = (data) => ({
  type: SHOP.FETCH_SALE_PRODUCTS_SUCCESS,
  payload: {
    data,
  },
});

export const fetchSaleProductsFail = (err) => ({
  type: SHOP.FETCH_SALE_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const fetchSaleProductsRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchSaleProducts());
    shopApis
      .fetchSaleProductsData(query)
      .then((res) => {
        dispatch(fetchSaleProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchSaleProductsFail(err));
      });
  };
};

//Get featured products
export const fetchFeaturedProducts = () => ({
  type: SHOP.FETCH_FEATURED_PRODUCTS,
});

export const fetchFeaturedProductsSuccess = (data) => ({
  type: SHOP.FETCH_FEATURED_PRODUCTS_SUCCESS,
  payload: {
    data,
  },
});

export const fetchFeaturedProductsFail = (err) => ({
  type: SHOP.FETCH_FEATURED_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const fetchFeaturedProductsRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchFeaturedProducts());
    shopApis
      .fetchFeaturedProductsData(query)
      .then((res) => {
        dispatch(fetchFeaturedProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchFeaturedProductsFail(err));
      });
  };
};

//Get best seller products
export const fetchBestSellerProducts = () => ({
  type: SHOP.FETCH_BEST_SELLER_PRODUCTS,
});

export const fetchBestSellerProductsSuccess = (data) => ({
  type: SHOP.FETCH_BEST_SELLER_PRODUCTS_SUCCESS,
  payload: {
    data,
  },
});

export const fetchBestSellerProductsFail = (err) => ({
  type: SHOP.FETCH_BEST_SELLER_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const fetchBestSellerProductsRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchBestSellerProducts());
    shopApis
      .fetchBestSellerProductsData(query)
      .then((res) => {
        dispatch(fetchBestSellerProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBestSellerProductsFail(err));
      });
  };
};

//Get best seller products
export const fetchDaleProducts = () => ({
  type: SHOP.FETCH_DALE_PRODUCTS,
});

export const fetchDaleProductsSuccess = (data) => ({
  type: SHOP.FETCH_DALE_PRODUCTS_SUCCESS,
  payload: {
    data,
  },
});

export const fetchDaleProductsFail = (err) => ({
  type: SHOP.FETCH_DALE_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const fetchDaleProductsRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchDaleProducts());
    shopApis
      .fetchDaleProductsData(query)
      .then((res) => {
        dispatch(fetchDaleProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDaleProductsFail(err));
      });
  };
};

//Get product detail
export const fetchProductDetail = () => ({
  type: SHOP.FETCH_PRODUCT_DETAIL,
});

export const fetchProductDetailSuccess = (data) => ({
  type: SHOP.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: {
    data,
  },
});

export const fetchProductDetailFail = (err) => ({
  type: SHOP.FETCH_PRODUCT_DETAIL_FAIL,
  payload: {
    err,
  },
});

export const fetchProductDetailRequest = (slug) => {
  return (dispatch) => {
    dispatch(fetchProductDetail());
    shopApis
      .fetchProductDetailData(slug)
      .then((res) => {
        dispatch(fetchProductDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchProductDetailFail(err));
      });
  };
};

//Get searched product

export const fetchSearchedProduct = () => ({
  type: SHOP.FETCH_SEARCHED_PRODUCTS,
});

export const fetchSearchedProductSuccess = (data) => ({
  type: SHOP.FETCH_SEARCHED_PRODUCTS_SUCCESS,
  payload: {
    data,
  },
});

export const fetchSearchedProductFail = (err) => ({
  type: SHOP.FETCH_SEARCHED_PRODUCTS_FAIL,
  payload: {
    err,
  },
});

export const fetchSearchedProductRequest = (query) => {
  return (dispatch) => {
    dispatch(fetchSearchedProduct());
    shopApis
      .fetchSearchedProductData(query)
      .then((res) => {
        dispatch(fetchSearchedProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchSearchedProductFail(err));
      });
  };
};
