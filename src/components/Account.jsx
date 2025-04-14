import { useDispatch } from "react-redux";
import api from "../api/api";
import { useGetReservationsQuery, useGetUserQuery, useReturnBookMutation } from "../app/librarySlice";
import { deleteToken } from "../app/tokenService";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // calls api to get user info
  const { data: user } = useGetUserQuery();

  // calls api to get user's book reservations
  const { data: userBooks } = useGetReservationsQuery();

  // calls api to return book
  const [returnBook] = useReturnBookMutation();

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row gy-4 gy-lg-0">
          <div className="col-12 col-lg-4 col-xl-3">
            <div className="row gy-4">
              <div className="col-12">
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-header text-bg-primary">
                    Welcome, {user?.firstname} {user?.lastname}
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fillRule="LightGrey"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                    </div>
                    <h5 className="text-center mb-1">
                      {user?.firstname} {user?.lastname}
                    </h5>
                    <p className="text-center text-secondary mb-4">{user?.email}</p>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <h6 className="m-0">Borrowed Books</h6>
                        <span>{user?.reservations.length}</span>
                      </li>
                    </ul>
                    <div className="d-grid m-0">
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => {
                          // deletes the user token on logout
                          deleteToken();
                          
                          // clears the stored cache on logout
                          dispatch(api.util.resetApiState());
                          
                          // return to home page
                          navigate("/");
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="card widget-card border-light shadow-sm">
              <div className="card-body p-4">
                <div>
                  <h5 className="mb-3">Borrowed Books</h5>
                  <div className="row row-cols-4 gap-3">
                    {user?.reservations.length > 0 ? (
                      userBooks?.map((obj) => {
                        return (
                          <div
                            className="card mb-3 text-bg-light"
                            key={obj.id}
                            id="card"
                          >
                            <img
                              src={obj.coverimage}
                              className="card-img-top pt-3"
                              alt={`The cover of ${obj.title}`}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{obj.title}</h5>
                              <p className="card-text">
                                <small className="text-body-secondary">
                                  {obj.author}
                                </small>
                              </p>
                              <div className="d-grid m-0">
                                <button className="btn btn-outline-danger" onClick={() => returnBook({ reservationId: obj.id })}>Return Book</button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <span>You Have No Borrowed Books!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
