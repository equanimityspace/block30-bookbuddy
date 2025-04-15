/* TODO - add your code to create a functional React component that renders a login form */
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/librarySlice";
import { useState } from "react";
import InfoModal from "./Modal";

export default function Login() {
  const [show, setShow] = useState(false);
  
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [login] = useLoginMutation();

  // Stores data from login form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Updates formData whenever input field changes
  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit login request
  const submit = async (e) => {
    try {
      e.preventDefault();

      const response = await login(formData);
      setResponse(response);

      // opens popup message
      openModal();

      // if login success return to home
      if (response?.data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container card mt-4 w-25">
      {/* <!-- Pills navs --> */}
      <ul
        className="nav nav-pills nav-justified mb-3 mt-4"
        id="ex1"
        role="tablist"
      >
        <li className="nav-item me-1" role="presentation">
          <NavLink
            to="/login"
            className="nav-link"
            id="tab-login"
            role="tab"
            aria-controls="pills-login"
          >
            Login
          </NavLink>
        </li>
        <li className="nav-item ms-1" role="presentation">
          <NavLink
            to="/register"
            className="nav-link"
            id="tab-register"
            role="tab"
            aria-controls="pills-register"
          >
            Register
          </NavLink>
        </li>
      </ul>

      {/* <!-- Pills content --> */}
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          {!response?.data ? (
            <InfoModal
              show={show}
              hide={closeModal}
              heading={response?.error.status}
              body={response?.error.data.message}
            />
          ) : (
            <></>
          )}
          <form onSubmit={submit}>
            {/* <!-- Email input --> */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput-login-email"
                placeholder="name@example.com"
                name="email"
                onChange={update}
              />
              <label htmlFor="floatingInput-login-email">Email</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInput-login-password"
                placeholder="Password"
                name="password"
                onChange={update}
              />
              <label htmlFor="floatingInput-login-password">Password</label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary mb-4">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
