const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// 1. User requests a book
const requestBook = async (req, res) => {
    try {
        const bookId = req.body.bookId;
        const book = await Book.findById(bookId);

        if (!book || book.availableStock <= 0) {
            return res.status(400).json({ success: false, message: 'Book not available' });
        }

        const transaction = await Transaction.create({
            book: bookId,
            user: req.user.id,
        });

        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Admin Approves Request
const approveRequest = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Not found' });

        const book = await Book.findById(transaction.book);
        
        transaction.status = 'issued';
        transaction.issueDate = new Date();
        transaction.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        
        book.availableStock -= 1; // Decrease stock
        
        await transaction.save();
        await book.save();

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. User Returns Book & Calculate Fine
const returnBook = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        const book = await Book.findById(transaction.book);

        transaction.status = 'returned';
        transaction.returnDate = new Date();

        // Simple Fine Logic: 10 units per day late
        if (transaction.returnDate > transaction.dueDate) {
            const diffTime = Math.abs(transaction.returnDate - transaction.dueDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            transaction.fine = diffDays * 10;
        }

        book.availableStock += 1; // Add back to stock

        await transaction.save();
        await book.save();

        res.status(200).json({ success: true, message: 'Book returned', fine: transaction.fine });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get logged-in user transactions
// @route   GET /api/transactions/my-history
const getMyTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id })
            .populate('book', 'title coverImage'); // Joins book data so we see title/image
            
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { requestBook, approveRequest, returnBook, getMyTransactions };