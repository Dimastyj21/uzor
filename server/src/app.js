const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter')

const app = express();

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use((error, req, res, next) => {
console.log(error)
res.status(500).json({ message: error.message })
})

module.exports = app