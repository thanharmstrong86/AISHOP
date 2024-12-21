const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Get About Content
router.get('/', aboutController.getAboutContent);

// Update About Content
router.put('/', aboutController.updateAboutContent);

module.exports = router;
