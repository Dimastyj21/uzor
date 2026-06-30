const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const { where } = require('sequelize')

class AuthServices {

    static async createUser({ email, name, password }) {
        if(!email || !name || !password) {
            throw new Error('Не все поля')
        }

        const hashpass = await bcrypt.hash(password, 10)

        const newUser = await User.create({ email, name, hashpass })

        if(!newUser) {
            throw new Error('Не смог создать юзера!')
        }

        const plainNewUser = newUser.get()
        delete plainNewUser.hashpass
    }

    static async findUserByEmail(email) {
        if(!email) return null
        const user = await User.findOne({ where: { email }})
        return user ? user.get() : null
    }

    static async signin({ email, password }) {
        if(!email, !password) {
            throw new Error('Не все поля!')
        }
        
        const user = await User.findOne({ where: {email} })
        if(!user){
            throw new Error('Пользователь не найден');
        }
        const isMatch = await bcrypt.compare(password, user.hashpass)
        if(!isMatch){
            throw new Error('Неверный пароль');
        }
        const plainUser = user.get()
        delete plainUser.hashpass
        return { user: plainUser }
    }

}

module.exports = AuthServices