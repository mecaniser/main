function booksControllers(Book) {
  function post(req, res) {
    const book = new Book(req.body)

    if(!req.body.title) {
      res.status(400)
      return res.send("Title is required")
    }
    
    book.save()
    res.status(201)
    return res.json(book)
  }
  function get(req, res) {
    const query = {}
    if (req.query.genre) query.genre = req.query.genre
    Book.find(query, (err, books) => {
      const returnedBooks = books.map((book)=>{
        const newBook = book.toJSON()
        newBook.links = {}
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`
        return newBook
      })
      err ? res.send(err) : res.json(returnedBooks)
    })
  }
  return { post, get }
}

module.exports = booksControllers