import axiosService from "./axiosService";

export const getUser = async params => {
  const { data } = await axiosService.get("/api/users/" + params);
  return data;
};

export const updateUser  = async user => {
  return axiosService.put("/api/users/", user);
};

export const addUser  = async user => {
  return axiosService.post('/api/users/', user);
};

export const fetchUserData = userId => {
  let endpoint = `/api/users/${userId}`
  return axiosService.get(endpoint);
};