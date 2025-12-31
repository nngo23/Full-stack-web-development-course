import { useQuery } from "@apollo/client/react";
import { ME, BOOKS_BY_GENRE } from "../queries.jsx";

const Recommend = (props) => {
  const meResult = useQuery(ME);
  const { data: result, loading: loading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: meResult.data?.me?.favoriteGenre || "" },
  });
  if (!props.show) {
    return null;
  }
  if (loading || meResult.loading) {
    return <div>loading...</div>;
  }
  if (!result || !meResult.data.me) {
    return null;
  }
  const recommendedBooks = result.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{" "}
        <strong> {meResult.data.me.favoriteGenre || "unknown"}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
