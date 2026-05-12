const express = require('express');
const router = express.Router();
const { addBook, getBooks } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

// Public route: Anyone can see the books
router.get('/', getBooks);

// Protected route: Only Admin can add books
router.post('/', protect, admin, upload.single('image'), addBook);

module.exports = router;