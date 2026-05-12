const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Please add a book title'] 
    },
    author: { 
        type: String, 
        required: [true, 'Please add an author'] 
    },
    isbn: { 
        type: String, 
        required: [true, 'Please add an ISBN'], 
        unique: true 
    },
    category: { 
        type: String, 
        required: [true, 'Please add a category'] 
    },
    coverImage: { 
        type: String, // This will store the Cloudinary secure_url later
        default: 'no-photo.jpg' 
    },
    totalStock: { 
        type: Number, 
        required: true, 
        default: 1 
    },
    availableStock: { 
        type: Number, 
        required: true, 
        default: 1 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Book', bookSchema);