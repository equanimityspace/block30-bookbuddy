/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useGetUserQuery } from "../app/librarySlice";
import { getToken, deleteToken } from "../app/tokenService";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const token = getToken();
  const navigate = useNavigate();

  const { data: user } = useGetUserQuery(token);
  console.log("token: ", token);
  console.log(user);

  return (
    <div>
      <h1>this is the account page</h1>
      <p>User id: {user?.id}</p>
      <p>First Name: {user?.firstname}</p>
      <p>Last Name: {user?.lastname}</p>
      <p>Email: {user?.email}</p>
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => {
          {/* Deletes the token stored in the Browser by calling function from tokenService*/}
          deleteToken();

          {/* returns back to home after logging out */}
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
}
