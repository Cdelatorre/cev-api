const express = require("express");
const router = express.Router();

const booksController = require("../controllers/book.controller");
const usersController = require("../controllers/user.controller");
const librariesController = require("../controllers/library.controller");

/* BOOKS ROUTES */

router.get("/books", booksController.getBooks);
router.get("/books/search", booksController.searchBooks);
router.get("/books/:id", booksController.getBookById);
router.post("/books", booksController.createBook);
router.delete("/books/:id", booksController.deleteBook);
router.patch("/books/:id", booksController.updateBook);

/* USERS ROUTES */

router.post("/register", usersController.registerUser);
router.get("/users", usersController.getUsers);
router.post("/login", usersController.loginUser);

/* LIBRARIES ROUTES */

router.get("/libraries", librariesController.getLibraries);

module.exports = router;
