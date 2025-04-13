import api from "../api/api";

const libraryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all books (GET) - Done - Test(Pass)
    // get book details (GET) - Done - Test(Pass)
    // login (POST) - Done - Test(Pass)
    // register (POST) - Done - Test(Pass) // make sure its not passing in an object
    // account details (GET) - Done - Test(Pass)
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
      query: ({ token, reservationId }) => ({
        url: `/reservations/${reservationId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

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
