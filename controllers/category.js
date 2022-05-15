const Category = require('../models/category')

exports.create = async (req, res) => {
    const { name } = req.body
    // return console.log(name)

    if (!name) {
        return res.status(400).json({ error: "Please fill up field" })
    }
    const checkIfExists = await Category.findOne({ name })
    // return console.log(checkIfExists)
    if (checkIfExists) {
        return res.status(400).json({ error: 'That category already exists!' })
    }
    const category = new Category({ name })
    try {
        const savedCategory = await category.save()
        res.status(200).json({ savedCategory, message: `Category '${savedCategory.name}' successfuly created!` })
    } catch (err) {
        res.status(500).json({ error: "Creating category error " + err })
    }


}
exports.updateCat = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, { $set: req.body }, { new: true })
        res.status(200).json(updatedCategory)
    } catch (err) {
        res.status(500).json({ error: "Updating category error " + err })
    }
}

exports.deleteCat = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId)
        res.status(200).json({ message: "Category succesfuly deleted" })
    } catch (err) {
        res.status(500).json({ error: "Current category deleting error " + err })
    }

}

exports.getAll = async (req, res) => {
    try {
        const allCategories = await Category.find()
        if (!allCategories) {
            return res.status(400).json({ error: 'There is no categories created' })
        }
        res.status(200).json(allCategories)
    } catch (err) {
        res.status(500).json({ error: "Getting all categories error " + err })
    }
}