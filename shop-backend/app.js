// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const categoryRoutes = require('./routes/categoryRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://thanharmstrong86.github.io'], // GitHub Pages URL
  optionsSuccessStatus: 200 // For legacy browser support
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
require('dotenv').config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env' });
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const Category = require('./models/Category');

const initializeCategories = async () => {
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.insertMany([{ name: 'Coffee' }, { name: 'Tea' }, { name: 'Food' }, { name: 'Milk' }]);
    console.log('Initial categories added');
  }
};
initializeCategories();

// Register route for categories
app.use('/api/categories', categoryRoutes);

// Use the product routes
app.use('/api/products', productRoutes); // Route for product-related API calls

app.use('/api/orders', orderRoutes);

app.use('/api/about', aboutRoutes);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the shop API!');
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
