// controllers/productController.js
const Product = require('../models/Product');

// Validation function
function validateProduct(req, res) {
  const { name, price, detail } = req.body;
  if (!name || !price || !detail) {
    console.log('Validation Error: Missing required fields');
    return res.status(400).json({ error: 'Name, price, detail are required' });
  }
  return null; // If validation passes, return null
}

// Get all products
exports.getProducts = async (req, res) => {
  console.log('Fetching all products...');
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params; // Get the product ID from the route parameters
  console.log(`Fetching product with ID: ${id}`);
  
  try {
    const product = await Product.findById(id); // Query the database by ID
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // Return the product
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  // Input validation
  if (validateProduct(req, res)) return;

  const { name, price, imageUrl, category, description, detail } = req.body;
  const newProduct = new Product({
    name,
    price,
    imageUrl,
    category,
    description,
    detail,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log('Creating a new product:', newProduct);

  try {
    const savedProduct = await newProduct.save();
    console.log('Product created successfully:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  if (validateProduct(req, res)) return;

  const { id } = req.params;
  const updates = { ...req.body, updatedAt: new Date() };

  console.log('Updating product:', id, 'with updates:', updates);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    console.log('Product updated successfully:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  console.log('Deleting product with ID:', id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log('Product not found for deletion:', id);
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted successfully:', deletedProduct);
    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
};