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

  return (
    <>
      <Navigations />
      <Routes>
        {/* No login needed */}
        <Route path="/" element={<Books />} />
        <Route path="/singleBook" element={<SingleBook book={book} />} />

        {/* must log in */}
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
