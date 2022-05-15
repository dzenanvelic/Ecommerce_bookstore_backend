const express = require('express')
const router = express.Router()

const { create, updateCat, deleteCat, getAll } = require('../controllers/category')


router.post('/category', create)
router.put('/category/:categoryId', updateCat)
router.delete('/category/:categoryId', deleteCat)
router.get('/category', getAll)


module.exports = router