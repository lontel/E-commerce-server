const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')


const port = process.env.PORT || 5005
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})