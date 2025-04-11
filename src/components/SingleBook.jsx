import React, { useEffect } from "react";
import { useGetBookDetailsQuery } from "../app/librarySlice";

export default function SingleBook({ book }) {
  const { data: bookDetail } = useGetBookDetailsQuery(book);

  console.log(bookDetail);

  return (
    <div>
      <h1>Single Book</h1>
    </div>
  );
}
/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
