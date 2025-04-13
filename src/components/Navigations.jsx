import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../index.css";

import { useGetAllBooksQuery } from "../app/librarySlice";

export default function Navigations({ setFilteredBooks }) {
  const location = useLocation();
  const titles = {
    "/": "Welcome!",
    "/singleBook": "Book Details",
    "/register": "Create an Account",
    "/login": "Welcome!",
    "/account": "My Books",
  };

  const { data: books } = useGetAllBooksQuery();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();

    if (!lowerCaseQuery) {
      setFilteredBooks(books);
      return;
    }

    const results = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lowerCaseQuery);
      const authorMatch = book.author.toLowerCase().includes(lowerCaseQuery);

      // return true if the query matches any of the fields
      return titleMatch || authorMatch;
    });

    setFilteredBooks(results);
  }, [searchQuery, books]); // Re-run effect when query or book list changes

  const pageTitle = titles[location.pathname];

  return (
    <div>
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          <img
            src="src\assets\bookbuddylogo.png"
            className="navbar-logo"
            alt=""
          ></img>
          <h1>Book Buddy</h1>
        </NavLink>
        <form className="searchbar">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search book by title or author"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" className="btn btn-outline-light">
            Search
          </button>
        </form>
      </nav>
      <nav className="mininav">
        <h1> {pageTitle} </h1>
        <div className="mininav dropdown">
          <NavLink
            className="mininav-link dropdown-toggle"
            to="/account"
            id="mininavDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            My Account
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="mininavDropdown">
            <NavLink className="mininav-item" to="/mybooks">
              My Books
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
