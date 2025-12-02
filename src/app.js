require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT;
const dataBooks = require(path.join(__dirname, "data.json"));
const dataLibraries = require(path.join(__dirname, "libraries.json"));

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello, this is the Book API!");
});

app.get("/books", (req, res, next) => {
  res.json(dataBooks);
});

app.get("/libraries", (req, res, next) => {
  res.json(dataLibraries);
});

app.get("/books/:id", (req, res, next) => {
  const id = req.params.id;

  const book = dataBooks.find((el) => {
    return el.id === Number(id);
  });

  res.json(book);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
