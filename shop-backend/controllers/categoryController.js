// Controller to get categories (controllers/categoryController.js)
const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('categories fetched successfully:', categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
