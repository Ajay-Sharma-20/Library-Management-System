require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// ==========================================
connectDB();
// ==========================================

// Enable Cross-Origin Resource Sharing (Allows React frontend to talk to this API)
app.use(cors());

// Parse incoming JSON data from HTTP requests
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));


// ==========================================
// ROUTES
// Example of a quick route in server.js
app.post('/api/feedback', require('./middleware/authMiddleware').protect, async (req, res) => {
    const { comment, rating } = req.body;
    const feedback = await require('./models/Feedback').create({
        user: req.user.id,
        comment,
        rating
    });
    res.status(201).json({ success: true, data: feedback });
});
// ==========================================

// Basic test route to verify the server is running
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the ChapterZero API!' });
});

// ADD THIS LINE: Connect the auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

// ==========================================
// GLOBAL ERROR HANDLING MIDDLEWARE
// ==========================================

// This catches any errors thrown in our routes and returns a clean JSON response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});


// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port ${PORT}`);
});