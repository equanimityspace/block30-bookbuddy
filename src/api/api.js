import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User", "Books"],
  endpoints: () => ({}),
});

export default api;
