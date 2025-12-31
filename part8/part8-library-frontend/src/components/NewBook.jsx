import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { ALL_AUTHORS, BOOKS_BY_GENRE, CREATE_BOOK } from "../queries.jsx";

const NewBook = ({ show, token, setError }) => {
  const client = useApolloClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages =
        error.graphQLErrors.map((e) => e.message).join("\n") ||
        "An error occurred";
      setError(messages);
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook;
      cache.updateQuery(
        { query: BOOKS_BY_GENRE, variables: { genre: "" } },
        (data) => {
          return {
            allBooks: data?.allBooks
              ? [...data.allBooks, addedBook]
              : [addedBook],
          };
        }
      );

      addedBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: BOOKS_BY_GENRE, variables: { genre: g } },
          (data) => {
            return {
              allBooks: data?.allBooks
                ? [...data.allBooks, addedBook]
                : [addedBook],
            };
          }
        );
      });

      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        const allAuthors = data.allAuthors;
        const normalizedName = addedBook.author.name.trim();
        const exists = allAuthors.find((a) => a.name.trim() === normalizedName);
        if (exists) {
          return {
            allAuthors: allAuthors.map((a) =>
              a.name.trim() === normalizedName
                ? { ...a, name: normalizedName, bookCount: a.bookCount + 1 }
                : a
            ),
          };
        }
        return {
          allAuthors: allAuthors.concat(addedBook.author),
        };
      });
    },
  });

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const submit = async (event) => {
    event.preventDefault();

    await createBook({
      variables: { title, author, published: Number(published), genres },
    });

    console.log("add book...");

    client.refetchQueries({
      include: [BOOKS_BY_GENRE],
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
