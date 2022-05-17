const { populate } = require('../models/product')
const Product = require('../models/product')

exports.createProduct = async (req, res) => {
    //return console.log(req.body)
    const { quantity, title, description, photo, author, price, category, } = req.body

    if (!quantity || !title || !description || !photo || !price || !category || !author) {
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
        res.status(200).json({ updatedProduct, message: `Product '${updatedProduct.title}' succesfully updated` })
    } catch (err) {
        res.status(500).json({ error: 'Product update error ' + err })




    }
}

exports.getAllProducts = async (req, res) => {

    try {
        const byOrder = req.query.byOrder
        const byAuthor = req.query.author
        const bySold = req.query.bySold
        const byPrice = req.query.price
        const byTitle = req.query.title
        const byCategories = req.query.category
        let books

        if (byAuthor) {
            books = await Product.find({ author: byAuthor })
                .populate("category")
                .sort({ createdAt: -1 })
        }
        else if (bySold) {
            books = await Product.find()
                .populate("category")
                .sort([[bySold, byOrder]])
                .limit(2)





        }
        else if (byCategories) {
            books = await Product.find({ category: byCategories })
                .populate('category')

        }
        else if (byTitle) {
            books = await Product.find({ title: byTitle })
                .populate("category")
                .sort({ createdAt: -1 })

        }
        else if (byPrice) {
            books = await Product.find({
                byPrice: {
                    $gte: byPrice[0],
                    $lte: byPrice[1]
                }
            })
                .populate('category')

        }
        else {
            books = await Product.find()
                .populate("category")
                .sort({ createdAt: -1 })
        }
        res.status(200).json(books)
    } catch (err) {
        res.status(500).json({ error: 'Filtering books error ' + err })
    }




}

exports.getRelated = async (req, res) => {
    try {
        const book = await Product.findById(req.params.productId)
            .populate('category')

        const related = await Product.find({
            _id: { $ne: book._id },
            category: book.category
        })
            .populate("category")
            .limit(4)
        res.json(related)
    } catch (err) {
        res.status(500).json({ error: "Related product filtering error " + err })
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