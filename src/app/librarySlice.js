import api from "../api/api";
// import { createSlice } from "@reduxjs/toolkit";

const libraryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all books (GET) - Done - Test(Pass)
    // get book details (GET) - Done - Test(Pass)
    // login (POST) - Done - assumed working
    // register (POST) - Done - Test(Pass)
    // account details (GET) - Done
    // get user reservations (GET) - Done
    // reserve book (POST) - Done
    // return book (DELETE) - Done

    // Books
    getAllBooks: build.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
    getBookDetails: build.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),

    // Users
    register: build.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: "/users/register",
        method: "POST",
        body: {
          firstname,
          lastname,
          email,
          password,
        },
      }),
    }),
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    getUser: build.query({
      query: (token) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // Reservations
    getReservations: build.query({
      query: (token) => ({
        url: "/reservations",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    reserveBook: build.mutation({
      query: (token, { bookId }) => ({
        url: "/reservations",
        method: "POST",
        body: {
          "application/json": bookId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    returnBook: build.mutation({
      query: (token, { reservationId }) => ({
        url: `/reservations/${reservationId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// // User register
// const storeToken = (state, { payload }) => {
//   localStorage.setItem("token", payload.token);
// };

// const registerSlice = createSlice({
//   name: "register",
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
//   },
// });

// export default registerSlice.reducer;

export const {
  useGetAllBooksQuery,
  useGetBookDetailsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useGetReservationsQuery,
  useReserveBookMutation,
  useReturnBookMutation,
} = libraryApi;
