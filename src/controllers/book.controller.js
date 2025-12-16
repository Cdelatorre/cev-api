const BookModel = require("../models/Book.model");
const UserModel = require("../models/User.model");

module.exports.getBooks = (req, res, next) => {
  BookModel.find()
    .populate("user")
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.log("entro", err);
      res.json(err);
    });
};

module.exports.searchBooks = (req, res, next) => {
  const authorQuery = req.query.author;

  BookModel.findOne({ author: authorQuery })
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getBookById = (req, res, next) => {
  const id = req.params.id;

  BookModel.findById(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createBook = (req, res, next) => {
  const newBook = req.body;

  BookModel.create(newBook)
    .then((bookCreated) => {
      res.json("Book created successfully!!");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.deleteBook = (req, res, next) => {
  const id = req.params.id;

  BookModel.findByIdAndDelete(id)
    .then(() => {
      res.json("Book deleted successfully");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updateBook = (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;

  BookModel.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      res.json(err);
    });
};
