const Category = require('../models/Category');
const Product = require('../models/Product');
// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Categories fetched successfully:', categories);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    console.error('Validation Error: Category name is required');
    return res.status(400).json({ error: 'Category name is required' });
  }

  const newCategory = new Category({ name });

  try {
    const savedCategory = await newCategory.save();
    console.log('Category created successfully:', savedCategory);
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    console.error('Validation Error: Category name is required');
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      console.error('Category not found for update:', id);
      return res.status(404).json({ error: 'Category not found' });
    }

    console.log('Category updated successfully:', updatedCategory);
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Find the category to get its name
    const category = await Category.findById(id);
    if (!category) {
      console.error('Category not found for deletion:', id);
      return res.status(404).json({ error: 'Category not found' });
    }

    // Step 2: Check if any product is using this category name
    const categoryInUse = await Product.findOne({ category: category.name });
    if (categoryInUse) {
      console.error(`Category "${category.name}" is being used by a product.`);
      return res.status(400).json({
        error: `Category "${category.name}" cannot be deleted because it is in use by a product.`,
      });
    }

    // Step 3: If not in use, proceed to delete the category
    const deletedCategory = await Category.findByIdAndDelete(id);

    console.log('Category deleted successfully:', deletedCategory);
    res.json({ message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
