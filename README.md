# Microservices API

This repository contains a RESTful API backend built with Express.js for an e-commerce application. It handles core functionalities such as user management, product inventory, shopping cart operations, and order processing.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **Joi**: Object schema description language and validator for data validation.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.

## Features

- **User Management**: Register and retrieve user details.
- **Product Management**: Create new products and retrieve product lists.
- **Cart Operations**: Add items to cart, remove items, and view cart contents.
- **Order Processing**: Create orders with stock validation and calculate totals.
- **In-Memory Storage**: Uses in-memory data structures for fast prototyping and testing without a persistent database dependency.
- **Data Validation**: Robust request validation using Joi schemas.
- **Error Handling**: Centralized error handling middleware.

## Installation and Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ayoitssmit/Microservies_API.git
    cd Microservies_API
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the server**
    ```bash
    npm start
    ```
    The server will start on port 5000 (or the port defined in your environment variables).

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

- `controllers/`: Logic for handling API requests.
- `middleware/`: Custom middleware for validation and error handling.
- `models/`: In-memory data configurations.
- `routes/`: Route definitions for API endpoints.
- `server.js`: Entry point of the application.

## License

This project is open-source and available for use and modification.