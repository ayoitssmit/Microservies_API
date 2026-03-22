# Microservices API — E-Commerce Application

This repository contains a full-stack e-commerce application with an Express.js RESTful API backend and a React front-end. It handles core functionalities such as user management, product inventory, shopping cart operations, and order processing.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.

### Frontend
- **React**: Component-based UI library.
- **Vite**: Next-generation frontend build tool.
- **React Router**: Client-side page navigation.
- **Axios**: Promise-based HTTP client for API integration.
- **Context API**: Global state management for cart operations.

## Features

- **User Management**: Register and retrieve user details.
- **Product Management**: Create new products and retrieve product lists.
- **Cart Operations**: Add items to cart, remove items, and view cart contents with global state management.
- **Order Processing**: Create orders with stock validation and calculate totals.
- **React Front-end**: ProductList, ProductDetail, Cart, and Checkout pages with a premium dark-themed UI.
- **MongoDB Integration**: Persists data efficiently using a real MongoDB database and Mongoose schemas.
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

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb://localhost:27017/ecommerce
    PORT=5000
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

### Users
- `GET /users`: Retrieve all users.
- `POST /users`: Register a new user.
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
- `GET /orders`: Retrieve all orders.
- `POST /orders`: Create a new order.
- `GET /orders/user/:userId`: Retrieve orders for a specific user.

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