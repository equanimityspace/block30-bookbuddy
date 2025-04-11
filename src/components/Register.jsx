/* TODO - add your code to create a functional React component that renders a registration form */
import { useEffect } from "react";
import { useRegisterMutation } from "../app/librarySlice";

export default function Register() {
  const [register] = useRegisterMutation();

  // for testing
  const firstname = "john";
  const lastname = "doe";
  const email = "johndoe1231453252113@gmail.com";
  const password = "password1";

  useEffect(() => {
    const testRegister = register({ firstname, lastname, email, password });
    console.log(testRegister);
  }, []);

  return (
    <div>
      <h1>this is the registration page</h1>
    </div>
  );
}
