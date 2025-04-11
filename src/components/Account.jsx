/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useGetUserQuery } from "../app/librarySlice";

export default function Account(token) {
  const { data: user } = useGetUserQuery(token);
  console.log(user);

  return (
    <div>
      <h1>this is the account page</h1>
    </div>
  );
}
