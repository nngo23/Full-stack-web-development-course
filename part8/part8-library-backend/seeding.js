const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const authors = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
  { name: "Joshua Kerievsky" },
  { name: "Sandi Metz" },
];

const books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

const seedDatabase = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");

  await Author.deleteMany({});
  await Book.deleteMany({});

  const authorMap = {};

  for (let authorData of authors) {
    const newAuthor = new Author(authorData);
    const result = await newAuthor.save();
    authorMap[authorData.name] = result._id;
  }

  for (let bookData of books) {
    const newBook = new Book({
      title: bookData.title,
      published: bookData.published,
      genres: bookData.genres,
      author: authorMap[bookData.author],
    });
    await newBook.save();
  }

  await mongoose.connection.close();
};

seedDatabase();
