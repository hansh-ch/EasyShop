import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/linkConstants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: (builder) => ({}),
});
