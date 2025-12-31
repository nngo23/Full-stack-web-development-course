import { useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
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
    setPage("login");
  };

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} token={token} />
      {!token && page === "login" && (
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setError={notification}
        />
      )}
      {token && page === "add" && (
        <NewBook show={page === "add"} token={token} setError={notification} />
      )}
      {token && page === "recommend" && (
        <Recommend show={page === "recommend"} />
      )}
    </div>
  );
};

export default App;
