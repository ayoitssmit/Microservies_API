const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables (if .env exists, though we are not strictly using it for DB)
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/payment', require('./routes/paymentRoutes'));
app.use('/upload', require('./routes/uploadRoutes'));

// Expose static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
