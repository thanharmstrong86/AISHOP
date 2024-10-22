


// Backend (Node.js with Express)
// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://nhamchithanh86:hgX2iY9PYclXg4ai@cluster0.s16ss.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define Product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model('Product', productSchema);

// API endpoint to get products
app.get('/api/products', async (req, res) => {
  try {
    console.log('Fetching products from the database...');
    const products = await Product.find();
    // Add the hardcoded imageUrl to each product
    const productsWithImage = products.map(product => ({
      ...product.toObject(),  // Convert the Mongoose document to a plain object
      imageUrl: 'http://localhost:5001/public/images/coffee.jpg',  // Add hardcoded imageUrl
    }));
    console.log('Products fetched successfully:', productsWithImage);
    res.json(productsWithImage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to create a new product
app.post('/api/products', async (req, res) => {
  const { name, price } = req.body;

  // Input validation
  if (!name || !price) {
    return res.status(400).json({ error: 'Name, price, and image URL are required' });
  }

  try {
    // Create a new product using the Product model
    const newProduct = new Product({ name, price });
    await newProduct.save(); // Save the product to MongoDB
    newProduct.imageUrl = 'http://localhost:5001/public/images/coffee.jpg'
    res.status(201).json(newProduct); // Send back the saved product
  } catch (err) {
    res.status(500).json({ error: 'Server error while adding the product' });
  }
});

// Define Routes
app.get('/', (req, res) => {
  res.send('Hello, welcome to the shop API!');
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));