const express = require('express')
const mongoose = require('mongoose')

const app = express()
const db = mongoose.connect('mongodb://localhost/bookAPI')
const debug = require('debug')('app')
const port = process.env.PORT || 3000

const Book = require('./models/bookModel')

const bookRouter = express.Router()

bookRouter.route("/books").get((req, res) => {
    const response = { hi: "This is my API" }
    res.json(response)
})

app.use("/api", bookRouter)

app.get('/', (req, res) => {
    res.send("Well here we go again")
})

app.listen(port, () => {
    debug("Running on port " + port)
})