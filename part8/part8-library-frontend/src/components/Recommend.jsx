import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOKS } from "../queries.jsx";

const Recommend = (props) => {
  const me_result = useQuery(ME);
  const result = useQuery(ALL_BOOKS);

  if (result.loading || me_result.loading) {
    return <div>loading...</div>;
  }
  if (!result.data?.allBooks || !me_result.data?.me) {
    return null;
  }
  if (!props.show) {
    return null;
  }

  const recommendedBooks = result.data.allBooks.filter((b) =>
    b.genres.includes(me_result.data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{" "}
        <strong> {me_result.data.me.favoriteGenre || "unknown"}</strong>
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
