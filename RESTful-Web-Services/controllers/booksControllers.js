function booksControllers(Book) {
  function post(req, res) {
    const book = new Book(req.body)
    book.save()
    res.status(201)
    return res.json(book)
  }
  function get(req, res) {
    const query = {}
    if (req.query.genre) query.genre = req.query.genre
    Book.find(query, (err, books) => {
      err ? res.send(err) : res.json(books)
    })
  }
  return { post, get }
}

module.exports = booksControllers