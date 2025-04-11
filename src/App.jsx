import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import SingleBook from "./components/SingleBook";

function App() {
  const [book, setBook] = useState(42);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxMzcsImVtYWlsIjoiZW1haWwxMjQwMTIzNDlAZ21haWwuY29tIiwiaWF0IjoxNzQ0MzkzOTEzLCJleHAiOjE3NDQ5OTg3MTN9.i3LPCgpfG8stA353jBmEcTdssanEsoLifSEwUIUDajQ"
  );

  return (
    <>
      <Navigations />
      <Routes>
        {/* No login needed */}
        <Route path="/" element={<Books />} />
        <Route path="/singleBook" element={<SingleBook book={book} />} />

        {/* must log in */}
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
