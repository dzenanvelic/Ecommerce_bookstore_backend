const router = require('express').Router()

const { createProduct, updateProduct, getAllProducts, deleteProduct, getProduct, getRelated } = require('../controllers/product')

router.post('/product', createProduct)
router.put('/product/:productId', updateProduct)
router.get('/product', getAllProducts)
router.get('/product/related/:productId', getRelated)
router.get('/product/:productId', getProduct)
router.delete('/product/:productId', deleteProduct)

module.exports = router
