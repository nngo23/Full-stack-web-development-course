import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries.jsx";

const LoginForm = ({ show, setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setError(error.graphQLErrors[0].message);
      } else {
        setError("Login failed");
      }
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const result = await login({ variables: { username, password } });
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            style={{ backgroundColor: "yellow" }}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ backgroundColor: "yellow" }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: "lightgreen" }}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
