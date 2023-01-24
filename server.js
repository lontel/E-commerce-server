const express = require('express')
const app = express()
const mongoose = require('mongoose')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const { handleError, convertToApiError } = require('./middleware/apiError')
const routes = require('./routes')
require('dotenv').config()

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose
    .set("strictQuery", false)
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    })
    .catch((err) => {
        console.error("Error connecting to Mongo: ", err)
    })


//// body parse
app.use(express.json())


//// sanitize
app.use(xss())
app.use(mongoSanitize())

//// routes
app.use('/api', routes)

//// handle errors
app.use(convertToApiError)
app.use((err, req, res, next) => {
    handleError(err, res)
})


const port = process.env.PORT || 5005
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})