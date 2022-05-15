const express = require('express')
const router = express.Router()


const { getUser } = require('../controllers/user')

router.get('/user/:userId', getUser)


module.exports = router