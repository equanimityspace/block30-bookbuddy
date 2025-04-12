import "../index.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Navigations() {
  const location = useLocation();
  const titles = {
    "/": "Welcome!",
    "/singleBook": "Book Details",
    "/register": "Create an Account",
    "/login": "Welcome!",
    "/account": "My Books",
  };

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
            placeholder="Search all books..."
            aria-label="Search"
          />
          <button type="button" class="btn btn-outline-light">
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

/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
// navbar-light bg-light justify-content-between
