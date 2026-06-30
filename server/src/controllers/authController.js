const AuthServices = require("../services/authServices")

class AuthController {

    static async signup(req, res) {
        try {
            const user = await AuthServices.createUser(req.body)

            console.log(user)

            const { accessToken, refreshToken } = generateToken(user)

            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AuthController