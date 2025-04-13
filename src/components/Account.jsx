/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useGetReservationsQuery, useGetUserQuery } from "../app/librarySlice";
import { getToken, deleteToken } from "../app/tokenService";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const token = getToken();
  const navigate = useNavigate();

  // calls api to get user info
  const { data: user } = useGetUserQuery(token);

  // calls api to get user's book reservations
  const { data: userBooks } = useGetReservationsQuery(token);

  // ********** FOR TESTING ONLY **********
  console.log("token: ", token);
  console.log(user);
  console.log(userBooks);

  return (
    <section class="py-3 py-md-5 py-xl-8">
      <div class="container">
        <div class="row gy-4 gy-lg-0">
          <div class="col-12 col-lg-4 col-xl-3">
            <div class="row gy-4">
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">
                    Welcome, {user?.firstname} {user?.lastname}
                  </div>
                  <div class="card-body">
                    <div class="text-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="LightGrey"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                    </div>
                    <h5 class="text-center mb-1">
                      {user?.firstname} {user?.lastname}
                    </h5>
                    <p class="text-center text-secondary mb-4">{user?.email}</p>
                    <ul class="list-group list-group-flush mb-4">
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <h6 class="m-0">Borrowed Books</h6>
                        <span>{user?.reservations.length}</span>
                      </li>
                    </ul>
                    <div class="d-grid m-0">
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={() => {
                          deleteToken();
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
          <div class="col-12 col-lg-8 col-xl-9">
            <div class="card widget-card border-light shadow-sm">
              <div class="card-body p-4">
                <div>
                  <h5 class="mb-3">Borrowed Books</h5>
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
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h3>No books found!</h3>
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
