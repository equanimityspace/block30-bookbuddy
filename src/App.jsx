import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import Details from "./components/Details";

function App() {
  const [book, setBook] = useState(42);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxMzcsImVtYWlsIjoiZW1haWwxMjQwMTIzNDlAZ21haWwuY29tIiwiaWF0IjoxNzQ0MzkzOTEzLCJleHAiOjE3NDQ5OTg3MTN9.i3LPCgpfG8stA353jBmEcTdssanEsoLifSEwUIUDajQ"
  );
  const [filteredBooks, setFilteredBooks] = useState("");

  return (
    <>
      <Navigations setFilteredBooks={setFilteredBooks} />
      <Routes>
        {/* No login needed */}
        <Route path="/" element={<Books filteredBooks={filteredBooks} />} />
        <Route path="/details" element={<Details book={book} />} />

        {/* must log in */}
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
