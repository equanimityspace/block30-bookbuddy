/* TODO - add your code to create a functional React component that renders a registration form */
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../app/librarySlice";
import InfoModal from "./Modal";

export default function Register() {
  const [show, setShow] = useState(false);
  
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [register] = useRegisterMutation();

  // Stores data from register form
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // updates formData whenever input field changes
  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit register request
  const submit = async (e) => {
    try {
      e.preventDefault();

      const response = await register(formData);
      setResponse(response);

      // if error opens popup, if not skip
      openModal();
      
      // if user succesfully registers redirect to home page
      if (response?.data) {
        navigate("/");
      }

    } catch (error) {
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
            data-mdb-pill-init
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
            data-mdb-pill-init
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
          {!response?.data ? 
          (<InfoModal
            show={show}
            hide={closeModal}
            heading={response?.error.status}
            body={response?.error.data.message}
          />): (
            <></>
          )}
          <form onSubmit={submit}>
            {/* <!-- First Name input --> */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput-register-firstName"
                placeholder="John"
                name="firstname"
                onChange={update}
              />
              <label htmlFor="floatingInput-register-firstName">
                First Name
              </label>
            </div>

            {/* <!-- Last Name input --> */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput-register-lastName"
                placeholder="Doe"
                name="lastname"
                onChange={update}
              />
              <label htmlFor="floatingInput-register-lastName">Last Name</label>
            </div>

            {/* <!-- Email input --> */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput-register-email"
                placeholder="name@example.com"
                name="email"
                onChange={update}
              />
              <label htmlFor="floatingInput-register-email">Email</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInput-register-password"
                placeholder="Password"
                name="password"
                onChange={update}
              />
              <label htmlFor="floatingInput-register-password">Password</label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary mb-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
