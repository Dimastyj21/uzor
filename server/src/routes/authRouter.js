const authRouter = require('express').Router()
const AuthController = require('../controllers/authController')

authRouter.post('/signup', AuthController.signup)
authRouter.post('/signin', AuthController.signin)

module.exports = authRouter;