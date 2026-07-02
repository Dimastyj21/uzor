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

            const { accessToken, refreshToken } = generateTokens({ user })

            res
            .cookie('refreshToken', refreshToken, cookieConfig.refresh)
            .json({ user, accessToken })
        } catch (error) {
            res.status(401).json({ message: error.message})
        }
    }

    static async signin(req, res) {
        try {
            const { user } = await AuthServices.checkUser(req.body)
            if(!user) {
                throw new Error('Не выерный юзер!')
            }
            const { accessToken, refreshToken } = generateTokens(user)

            res
            .cookie('refreshToken', refreshToken, cookieConfig.refresh)
            .json({user, accessToken})
        } catch (err) {
            if (err.message === 'Не все поля') {
        return res.status(400).json({ message: err.message });
      }
      if (err.message === 'Пользователь не найден' || err.message === 'Неверный пароль') {
        return res.status(401).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
        }
    }

    static async logout(req, res) {
        res.clearCookie('refreshToken')
        res.sendStatus(204)
    }
}

module.exports = AuthController