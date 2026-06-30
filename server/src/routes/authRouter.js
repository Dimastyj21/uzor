const authRouter = require('express').Router()
const AuthController = require('../controllers/authController')

authRouter.post('/signup', AuthController.signup)

module.exports = authRouter;