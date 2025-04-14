import api from "../api/api";

const libraryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Books
    getAllBooks: build.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    getBookDetails: build.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
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
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Reservations
    getReservations: build.query({
      query: () => ({
        url: "/reservations",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    reserveBook: build.mutation({
      query: ({ bookId }) => ({
        url: "/reservations",
        method: "POST",
        body: {
          bookId: bookId,
        },
      }),
      invalidatesTags: ["Books", "User"],
    }),

    returnBook: build.mutation({
      query: ({ reservationId }) => ({
        url: `/reservations/${reservationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "User"],
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
