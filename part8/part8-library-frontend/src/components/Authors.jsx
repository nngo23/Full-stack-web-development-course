import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_BORN } from "../queries.jsx";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }
  const update = (event) => {
    event.preventDefault();
    editBorn({ variables: { name, born: parseInt(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={update}>
        <label>
          name
          <select name="author name" onChange={(e) => setName(e.target.value)}>
            <option value="">select author</option>
            {result.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
