const User = require('../models/user')




//get single user
exports.getUser = async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.userId)

        if (!singleUser) {
            return res.status(400).json({ error: 'There is not such a user' })
        }
        const { password, ...others } = singleUser._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json({ error: "User finding error " + err })
    }
}
exports.getUsers = async (req, res) => {

    try {
        const users = await User.find()
        if (!users) {
            return res.status(400).json({ error: "There is no users inside database!" })
        }
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: "Finding useres error " + err })
    }
}