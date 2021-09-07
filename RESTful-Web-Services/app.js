const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const db = mongoose.connect('mongodb://localhost/bookAPI')
const debug = require('debug')('app')
const port = process.env.PORT || 3000

const Book = require('./models/bookModel')

const bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api", bookRouter)

app.get('/', (req, res) => {
    res.send("Well here we go again")
})

app.listen(port, () => {
    debug("Running on port " + port)
})