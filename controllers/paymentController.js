const initiatePayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        if (!amount) {
            res.status(400);
            throw new Error('Amount is required');
        }

        res.status(200).json({
            success: true,
            transactionId: `txn_mock_${Math.floor(Math.random() * 1000000)}`,
            message: `Mock payment initiated for ${amount} ${currency || 'USD'}`
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message || 'Payment initiation failed');
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { transactionId } = req.body;
        
        if (!transactionId) {
            res.status(400);
            throw new Error('Transaction ID is required');
        }

        res.status(200).json({
            success: true,
            status: 'completed',
            message: `Payment verified for transaction ${transactionId}`
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message || 'Payment verification failed');
    }
};

module.exports = {
    initiatePayment,
    verifyPayment
};
