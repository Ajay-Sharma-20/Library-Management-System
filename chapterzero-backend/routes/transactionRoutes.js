const express = require('express');
const router = express.Router();
const { requestBook, approveRequest, returnBook, getMyTransactions } = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/request', protect, requestBook);
router.put('/approve/:id', protect, admin, approveRequest);
router.put('/return/:id', protect, returnBook);
router.get('/my-history', protect, getMyTransactions);

module.exports = router;