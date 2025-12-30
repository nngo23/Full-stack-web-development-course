import { useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notification = (message, time = 4000) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, time);
  };

  const logout = async () => {
    setToken(null);
    localStorage.clear();
    await client.resetStore();
  };

  const [token, setToken] = useState(null);
  if (!token) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notification} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>

      <Authors
        show={page === "authors"}
        token={token}
        setError={notification}
      />

      <Books show={page === "books"} token={token} setError={notification} />

      <NewBook show={page === "add"} token={token} setError={notification} />
    </div>
  );
};

export default App;
