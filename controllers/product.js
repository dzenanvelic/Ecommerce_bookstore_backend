const Product = require('../models/product')

exports.createProduct = async (req, res) => {
    //return console.log(req.body)
    const { title, description, photo, author, price, category, } = req.body

    if (!title || !description || !photo || !price || !category || !author) {
        return res.status(422).json({ error: "Please fill up all fields" })


    }

    try {
        const ifProductExists = await Product.findOne({ title })
        if (ifProductExists?.title === title && ifProductExists?.author === author) {
            return res.status(422).json({ error: "This book already exists" })
        }

        const product = new Product(req.body)
        const savedProduct = await product.save()
        res.status(200).json({ savedProduct, message: `Product '${savedProduct.title}' successfuly created` })
    } catch (err) {
        res.status(500).json({ error: 'Product creating error ' + err })
    }

}
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { $set: req.body }, { new: true })
        res.status(200).json({ updatedProduct, message: `Product '${updatedProduct.title}' succesfully created` })
    } catch (err) {
        res.status(500).json({ error: 'Product update error ' + err })




    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(500).json({ error: "Error loading products " + err })
    }

}
exports.getProduct = async (req, res) => {
    try {
        const singleProduct = await Product.findById(req.params.productId)
        if (!singleProduct) {
            return res.status(400).json({ error: "There is no such a product" })
        }
        res.status(200).json(singleProduct)
    } catch (err) {
        res.status(500).json({ error: 'Product finding error ' + err })
    }
}
exports.deleteProduct = async (req, res) => {

    try {
        const productForDeleting = await Product.findById(req.params.productId)
        if (!productForDeleting) {
            return res.status(422).json({ error: 'There is no such a product, please try again!' })
        }
        await productForDeleting.delete()
        res.status(200).json({ message: 'Product successfuly deleted!' })
    } catch (err) {
        res.status(500).json({ error: "product deleting error " + err })
    }
}