import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../app/tokenService";

const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Books"],
  endpoints: () => ({}),
});

export default api;
