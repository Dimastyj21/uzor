class AuthController {

    static async signup(req, res) {
        try {
            const user = await AuthServices.createUser(req.body)

            

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AuthController