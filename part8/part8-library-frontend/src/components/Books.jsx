import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { BOOKS_BY_GENRE } from "../queries.jsx";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const { data, loading, refetch } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre || "" },
  });

  if (!props.show) return null;
  if (loading) return <div>loading...</div>;

  const booksByGenre = data?.allBooks || [];
  const allGenres = [...new Set(booksByGenre.flatMap((b) => b.genres))];

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong> {genre || "all"}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g) && refetch({ genre: g })}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null) && refetch({ genre: "" })}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
