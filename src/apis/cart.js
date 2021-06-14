import axiosService from "../common/axiosService";
import { API_URL } from "../common/defines";
import { renderParam } from "../common/utils";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";

export const getCartProducts = async params => {
  const { data } = await axiosService.get("/api/cart/");
  return data;
};

export const updateCartProducts = async cartItem => {
 return axiosService.put('/api/cart', cartItem)
};

export const deleteCartProducts = async cartItem => {
return  axiosService.delete('/api/cart/'+cartItem.slug, cartItem)

};


const url = "/cart";

export const fetchCartData = (cartId) => {
  let endpoint = cartId ? API_URL + url + `/${cartId}` : API_URL + url;
  return axiosService.get(endpoint);
};

export const fetchProductIdCartData = (pid) => {
  let endpoint = API_URL + url + "?" + renderParam("productId", pid);
  return axiosService.get(endpoint);
};

export const addCartData = (data) => {
  let endpoint = API_URL + url;
  return axiosService.post(endpoint, data);
};

export const removeCartData = (cartId) => {
  let endpoint = API_URL + url + `/${cartId}`;
  return axiosService.delete(endpoint);
};

export const updateCartData = (cartId, data) => {
  let endpoint = API_URL + url + `/${cartId}`;
  return axiosService.patch(endpoint, data);
};
