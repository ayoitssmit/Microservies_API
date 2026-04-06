const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/process', protect, initiatePayment);
router.post('/verify', protect, verifyPayment);

module.exports = router;
