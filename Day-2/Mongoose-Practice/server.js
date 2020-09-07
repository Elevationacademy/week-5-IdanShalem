// Server setup
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./server/routes/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/peopleDB', { useNewUrlParser: true })

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})