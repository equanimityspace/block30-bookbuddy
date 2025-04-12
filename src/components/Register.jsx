/* TODO - add your code to create a functional React component that renders a registration form */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../app/librarySlice";

export default function Register() {
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

  // ********** FOR TESTING ONLY **********
  // console.log("firstname: ", formData.firstname);
  // console.log("lastname: ", formData.lastname);
  // console.log("email: ", formData.email);
  // console.log("password: ", formData.password);

  // Submit register request
  const submit = async (e) => {
    try {
      e.preventDefault();

      const response = await register(formData);

      // ********** FOR TESTING ONLY **********
      console.log("Register success, token: ", response.data.token);
      console.log("first name: ", response.data.user.firstname);
      console.log("last name: ", response.data.user.lastname);
      console.log("email: ", response.data.user.email);
    } catch (error) {
      console.log("Register error: ", error);
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
