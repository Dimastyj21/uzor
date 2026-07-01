const cookieConfig = require("../configs/cookieConfig")
const AuthServices = require("../services/authServices")
const generateTokens = require("../utils/generateTokens")
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController {

    static async signup(req, res) {
        try {
            const user = await AuthServices.createUser(req.body)

            console.log(user)

            const { accessToken, refreshToken } = generateTokens(user)

            console.log({ refreshToken })
            
            res
            .cookie('refreshToken', refreshToken, cookieConfig.refresh)
            .json({ user, accessToken })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken: oldRefreshtoken } = req.cookies
            const { user } = jwt.verify(oldRefreshtoken, process.env.REFRESH_TOKEN_SECRET)

        } catch (error) {
            
        }
    }
}

module.exports = AuthController