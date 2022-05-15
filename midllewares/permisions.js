const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.auth = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (!authorization) {
            return res.status(401).json({ error: "You must be logged in" })
        }
        const token = await authorization.replace("Bearer ", "")
        //verify token
        jwt.verify(token, process.env.SECRET, async (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "You must be logged in" })
            }
            const { id } = payload
            const user = await User.findById(id)
            req.user = user
            next()
        })
    } catch (err) {
        res.status(500).json({ error: "Permision error " + err })
    }
}

exports.superAdminUser = async (req, res, next) => {
    try {
        const { _id } = req.user
        const adminUser = await User.findOne({ _id })
        if (adminUser.role !== "superadmin") {
            return res.status(403).json({ error: "You are not allowed" })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ error: "You not allowed " + err })
    }

}
exports.adminUser = async (req, res, next) => {
    try {
        const { _id } = req.user
        const adminUser = await User.findOne({ _id })
        if (adminUser.role !== "admin") {
            return res.status(403).json({ error: "You are not allowed" })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ error: "You are not allowed " + err })
    }

}