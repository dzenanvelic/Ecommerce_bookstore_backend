const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.register = async (req, res) => {
    const { username, email, password } =
        req.body
    // return console.log(req.body)
    try {
        //check taht all required fields are filled up
        if (!username || !email || !password) {
            return res.status(422).json({ error: "Please fill up all fields" })

        }
        //check passvord length, must be min 6
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' })
        }
        //check if already have that username
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(422).json({ error: "That username already exists, please pick another one" })
        }
        //salt password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await
            bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        //create user
        const savedUser = await newUser.save()
        res.status(200).json({ message: "User sucessfully created" })
    } catch (err) {
        res.status(500).json({ error: "Unable to create user " + err })
    }

}

exports.login = async (req, res) => {
    const username = req.body.username
    const userPassword = req.body.password
    try {
        //check that all required field are filled up
        if (!username || !userPassword) {
            return res.status(422).json({ error: "Please fill up all fields" })
        }
        //check if user exists
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "Wrong credentials!" })
        }
        //compare passwords
        const validated = await bcrypt.compare(userPassword, user.password)
        if (!validated) {
            return res.status(400).json({ error: "Wrong credentials!" })
        }

        //assign token for user
        const token = await jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "5d" })
        // return console.log("token", token, "user", user)
        const { password, ...others } = user._doc
        res.status(200).json({ token, others })
    } catch (err) {
        res.status(500).json({ error: "Unable to login " + err })
    }

}