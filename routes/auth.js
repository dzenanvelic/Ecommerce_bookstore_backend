const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/auth')
const { auth, authAdmin, superAdminAuth } = require('../midllewares/permisions')

router.post('/register', register)
router.post('/login', login)
router.get('/hello', auth, (req, res) => {
    res.json({ message: "Hello auth" })
})


module.exports = router