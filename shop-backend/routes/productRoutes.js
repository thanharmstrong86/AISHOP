// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getProducts);
// Route: GET /api/products/:id
router.get('/:id', productController.getProductById);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update an existing product
router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;