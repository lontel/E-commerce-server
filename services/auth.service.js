const { User } = require("../models/user")

const createUser = async (email, password) => {
    try {

        if (await User.emailTaken(email)) {
            console.log('Email already used')
        }
        const user = new User({ email, password })
        await user.save()
        console.log(user)
        return user

    } catch (error) {
        throw error
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken()
    return token
}


module.exports = { createUser, genAuthToken }