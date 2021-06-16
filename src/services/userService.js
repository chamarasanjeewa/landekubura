import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from "react-query";
  import axiosService from "./axiosService";


export const getUser = async params => {
    const { data } = await axiosService.get("/api/users/"+params);
    return data;
  };