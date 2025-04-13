import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import Details from "./components/Details";
import Lost from "./components/Lost";

function App() {
  const [book, setBook] = useState();
  const [filteredBooks, setFilteredBooks] = useState("");

  return (
    <>
      <Navigations setFilteredBooks={setFilteredBooks} />
      <Routes>
        {/* No login needed */}
        <Route
          path="/"
          element={<Books filteredBooks={filteredBooks} setBook={setBook} />}
        />
        <Route
          path="/details"
          element={<Details book={book} setBook={setBook} />}
        />
        <Route path="/lost" element={<Lost/>} />

        {/* must log in */}
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
