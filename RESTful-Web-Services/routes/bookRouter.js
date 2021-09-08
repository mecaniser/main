const express = require("express")
const booksControllers = require("../controllers/booksControllers")

const bookRouter = express.Router()
const controller = require("../controllers/booksControllers")

function routes(Book) {
  const controller = booksControllers(Book)
  bookRouter.route("/books")
    .post(controller.post)
    .get(controller.get)
  bookRouter.use("/books/:bookId", (req, res, next) => {
    const query = req.params.bookId

    Book.findById(query, (err, book) => {
      if (err) return res.send(err)
      if (book) {
        req.book = book;
        return next()
      }
      return res.sendStatus(404)
    })
  })
  bookRouter.route("/books/:bookId")
    .get((req, res) => {
      const returnedBook = req.book.toJSON()
      const genre = req.book.genre.replace(" ", "%20")
      returnedBook.links = {}
      returnedBook.links.filteredByGenre = `http://${req.headers.host}/api/books/?genre=${genre}`
      res.json(returnedBook)
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title
      book.author = req.body.title
      book.genre = req.body.title
      book.read = req.body.title
      req.book.save((err) => {
        err ? res.send(err) : res.json(book)
      })
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) delete req.body._id
      Object.entries(req.body).forEach(element => {
        const key = element[0]
        const value = element[1]
        book[key] = value
      });
      req.book.save((err) => {
        err ? res.send(err) : res.json(book)
      })
    })
    .delete((req, res) => {
      debugger
      req.book.remove((err) => {
        err ? res.send(err) : res.sendStatus(204)
      })
    })
  return bookRouter;
}

module.exports = routes