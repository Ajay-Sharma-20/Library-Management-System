const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'issued', 'returned', 'rejected'],
        default: 'pending'
    },
    issueDate: Date,
    dueDate: Date,
    returnDate: Date,
    fine: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);