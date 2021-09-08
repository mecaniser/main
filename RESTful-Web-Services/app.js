const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
let db;
process.env.ENV === "Test" ? (db = mongoose.connect('mongodb://localhost/bookAPI_Test'), console.log("Test API")) :  (db = mongoose.connect('mongodb://localhost/bookAPI'), console.log("Prod API"))
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

app.server = app.listen(port, () => {
    debug("Running on port " + port)
})

module.exports = app;
