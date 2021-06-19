import axiosService from "./axiosService";
import { API_URL } from "../common/defines";
import { renderParam } from "../common/utils";

export const getCartProducts = async userId => {
  const { data } = await axiosService.get("/api/order/" + userId);
  return data;
};

export const updateOrder = async cartItem => {
  return axiosService.put("/api/order", cartItem);
};

export const addOrder = async cart => {
  return axiosService.post("/api/order", cart);
};

export const deleteCartProducts = async cartItem => {
  return axiosService.delete("/api/order/" + cartItem.slug, cartItem);
};

export const onRemoveProductFromCart = ({ cartId, onSuccess, onError }) => {
  if (cartId && cartId !== "" && cartId !== null) {
    removeCartData(cartId)
      .then(res => onSuccess && onSuccess(res))
      .catch(
        err =>
          onError && onError("Remove product failm, pleaser try again", err)
      );
  }
};

const url = "/cart";

export const fetchCartData = cartId => {
  let endpoint = cartId ? API_URL + url + `/${cartId}` : API_URL + url;
  return axiosService.get(endpoint);
};

export const fetchProductIdCartData = pid => {
  let endpoint = API_URL + url + "?" + renderParam("productId", pid);
  return axiosService.get(endpoint);
};


