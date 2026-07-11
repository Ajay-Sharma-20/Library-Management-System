const Book = require('../models/Book');

// @desc    Add a new book (Admin Only)
// @route   POST /api/books
const addBook = async (req, res) => {
    try {
        const { title, author, isbn, category, totalStock } = req.body;
        
        // The image URL comes from Cloudinary via multer
        const coverImage = req.file ? req.file.path : 'no-photo.jpg';

        const stockQuantity = Number(totalStock) || 1;

        const book = await Book.create({
            title,
            author,
            isbn,
            category,
            totalStock :stockQuantity,
            availableStock: stockQuantity, // Initially, all are available
            coverImage
        });

        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all books
// @route   GET /api/books
// @desc    Get all books (with Search & Filter)
// @route   GET /api/books
const getBooks = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        // Search by Title (Case-insensitive)
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filter by Category
        if (category) {
            query.category = category;
        }

        const books = await Book.find(query);
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addBook, getBooks };