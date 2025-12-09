require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const path = require("path");
const BookModel = require("./models/Book.model");
const UserModel = require("./models/User.model");
const app = express();

const PORT = process.env.PORT;
const dataBooks = require(path.join(__dirname, "data.json"));
const dataLibraries = require(path.join(__dirname, "libraries.json"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });

app.use(express.json());

// BOOKS

app.get("/", (req, res, next) => {
  res.send("Hello, this is the Book API!");
});

app.get("/books", (req, res, next) => {
  BookModel.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/books/:id", (req, res, next) => {
  const id = req.params.id;

  BookModel.findById(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/books", (req, res, next) => {
  const newBook = req.body;

  BookModel.create(newBook)
    .then((bookCreated) => {
      res.json("Book created successfully!!");
    })
    .catch((err) => {
      res.json(err);
    });
});

// USERS
app.post("/users", (req, res, next) => {
  const newUser = req.body;

  UserModel.create(newUser)
    .then((user) => {
      res.json("Usuario creado correctamente");
    })
    .catch((err) => {
      res.json(err);
    });
});

// LIBRARIES
app.get("/libraries", (req, res, next) => {
  res.json(dataLibraries);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
