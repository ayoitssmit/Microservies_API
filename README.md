# Microservices API — E-Commerce Application

This repository contains a full-stack e-commerce application with an Express.js RESTful API backend and a React front-end. It handles core functionalities such as user management, product inventory, shopping cart operations, and order processing.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **JWT & Bcrypt**: For secure user authentication and authorization.
- **Joi**: Data validation.
- **Multer**: For handling multipart/form-data (image uploads).

### Frontend
- **React**: Component-based UI library.
- **Vite**: Next-generation frontend build tool.
- **React Router**: Client-side page navigation.
- **Axios**: Promise-based HTTP client for API integration.
- **Context API**: Global state management for cart operations.

## Features

- **User Management & Auth**: User registration, login, JWT issuance, and password hashing.
- **Protected Routes**: Middleware to secure sensitive endpoints.
- **Product Management**: Create new products and retrieve product lists.
- **Cart Operations**: Add items to cart, remove items, and view cart contents with global state management.
- **Order Processing**: Create orders with stock validation and calculate totals.
- **React Front-end**: ProductList, ProductDetail, Cart, and Checkout pages with a premium dark-themed UI.
- **MongoDB Integration**: Persists data efficiently using a real MongoDB database and Mongoose schemas.
- **Image Uploads**: Local image upload handler using Multer.
- **Payment Mockup**: Dummy API endpoints for initiating and verifying payments.
- **Data Validation**: Inputs are validated using Joi.
- **Error Handling**: Centralized error handling middleware.

## Installation and Setup

### Backend

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ayoitssmit/Microservies_API.git
    cd Microservies_API
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb://localhost:27017/ecommerce
    PORT=5000
    JWT_SECRET=your_jwt_secret_here
    ```

4.  **Start the server**
    ```bash
    npm start
    ```
    The server will start on port 5000 (or the port defined in your environment variables).

### Frontend

1.  **Navigate to the client directory**
    ```bash
    cd client
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The React app will start on `http://localhost:5173` and connects to the backend API on port 5000.

## API Endpoints

### Users (Auth)
- `GET /users`: Retrieve all users (Protected).
- `POST /users`: Register a new user.
- `POST /users/login`: Authenticate a user and get JWT token.
- `GET /users/:id`: Retrieve a specific user by ID.

### Products
- `GET /products`: Retrieve all products.
- `POST /products`: Create a new product.
- `GET /products/:id`: Retrieve a specific product by ID.

### Cart
- `GET /cart/:userId`: Retrieve the cart for a specific user.
- `POST /cart`: Add an item to the cart.
- `DELETE /cart/:userId/item/:productId`: Remove an item from the cart.

### Orders
- `GET /orders`: Retrieve all orders (Protected).
- `POST /orders`: Create a new order (Protected).
- `GET /orders/user/:userId`: Retrieve orders for a specific user (Protected).

### Upload
- `POST /upload`: Upload an image using multipart/form-data (Protected). Local storage.

### Payments
- `POST /payment/process`: Initiate a dummy payment (Protected).
- `POST /payment/verify`: Verify a dummy payment (Protected).

## Deployment Instructions

### Render / Railway / Heroku

1. Create a clear account on Render or Railway.
2. Initialize a new Web Service and connect it to your GitHub Repository.
3. Configure the **Build Command** and **Start Command**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**: Add exactly the same variables used in your `.env` (like `MONGO_URI`, `JWT_SECRET`).
    - *Note for MongoDB*: You must use a cloud MongoDB cluster like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for production.
5. Deploy!

*Caveat with Uploads:* Render/Railway web instances often have ephemeral file systems. If an app restarts, locally stored uploads disappear. For a production-ready application, swap `multer` disk storage with `Cloudinary` or AWS S3.

## Project Structure

```
├── config/            # Database connection configuration
├── controllers/       # Logic for handling API requests
├── middleware/         # Custom middleware for error handling
├── models/            # Mongoose schemas (Product, User, Cart, Order)
├── routes/            # Route definitions for API endpoints
├── server.js          # Backend entry point
└── client/            # React front-end (Vite)
    └── src/
        ├── components/   # Reusable UI components (Navbar)
        ├── context/      # React Context providers (CartContext)
        ├── pages/        # Page components (ProductList, ProductDetail, Cart, Checkout)
        ├── api.js        # Axios API service layer
        ├── App.jsx       # Root component with React Router
        ├── main.jsx      # Application entry point
        └── index.css     # Global styles
```

## Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Product List | `/` | Displays all products in a grid with Add to Cart buttons |
| Product Detail | `/products/:id` | Shows full product details with quantity selector |
| Cart | `/cart` | Shows cart items with remove buttons and order summary |
| Checkout | `/checkout` | Order review and placement |

## License

This project is open-source and available for use and modification.