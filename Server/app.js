const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chat')

const app = express()
const port = 8080

app.use(express.json()); // application/json
app.use(cors())

app.use(chatRoutes)
app.use(authRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    res.status(status)
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})