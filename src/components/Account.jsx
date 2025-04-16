import { useDispatch } from "react-redux";
import api from "../api/api";
import {
  useGetReservationsQuery,
  useGetUserQuery,
  useReturnBookMutation,
} from "../app/librarySlice";
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
    <div className="acct-container">
      {/* <div className="acct-mainContent"> */}
      <div className="userInfo-container">
        {/* ^^weirdly contains the user's name, troubleshooting in progress */}
        <div className="userInfo-header">
          Welcome, {user?.firstname} {user?.lastname}
        </div>
        <div className="text-center mb-3">
          {/* ^^idk what this is doing, but its working^ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fillRule="LightGrey"
            className="userInfo-profilePic"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <h5 className="userInfo-name">
            {user?.firstname} {user?.lastname}
          </h5>
          <p className="userInfo-email">{user?.email}</p>
          <li className="userInfo-bbStat">
            <h6 className="m-0">Borrowed Books</h6>
            <span>{user?.reservations.length}</span>
          </li>
          <button
            className="acct-logoutBtn"
            type="button"
            onClick={() => {
              // deletes the user token on logout
              deleteToken();

              // refetch the user data stored cache on logout
              dispatch(api.util.resetApiState());

              // return to home page
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bb-container">
        <h5 className="bb-title">Borrowed Books</h5>
        <div className="bb-display">
          {user?.reservations.length > 0 ? (
            userBooks?.map((obj) => {
              return (
                <div className="bb-indvCard" key={obj.id} id="card">
                  <img src={obj.coverimage} alt={`The cover of ${obj.title}`} />
                  <div className="bb-body">
                    <h5 className="bb-bookTitle">{obj.title}</h5>
                    <p className="bb-author">
                      <small>{obj.author}</small>
                    </p>
                    <button
                      className="return-btn"
                      onClick={() => returnBook({ reservationId: obj.id })}
                    >
                      Return Book
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bb-empty">
              <span>You have not borrowed any books yet.</span>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
