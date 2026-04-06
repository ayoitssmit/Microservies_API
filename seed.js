const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const products = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        description: "High quality noise-canceling wireless headphones",
        stock: 50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Mechanical Keyboard",
        price: 129.99,
        description: "RGB mechanical keyboard with tactile switches",
        stock: 30,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Gaming Mouse",
        price: 59.99,
        description: "Ergonomic gaming mouse with customizable buttons",
        stock: 100,
        image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8fHwxNzc1NDUwMzMyfDA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "4K Monitor",
        price: 349.99,
        description: "27-inch Ultra HD 4K IPS monitor for professionals",
        stock: 20,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Smart Watch",
        price: 199.99,
        description: "Fitness tracker with heart rate monitor and GPS",
        stock: 75,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Laptop Stand",
        price: 39.99,
        description: "Ergonomic aluminum stand for laptops up to 17 inches",
        stock: 150,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Smartphone",
        price: 699.99,
        description: "Latest 5G smartphone with advanced triple-lens camera",
        stock: 45,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Leather Wallet",
        price: 49.99,
        description: "Genuine leather bifold wallet with RFID protection",
        stock: 200,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Coffee Maker",
        price: 89.99,
        description: "Programmable drip coffee maker with thermal carafe",
        stock: 60,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Electric Kettle",
        price: 29.99,
        description: "Fast-boiling stainless steel electric kettle",
        stock: 120,
        image: "https://images.unsplash.com/photo-1643114786355-ff9e52736eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjBrZXR0bGV8ZW58MHx8fHwxNzc1NDUwMzMzfDA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "Backpack",
        price: 69.99,
        description: "Water-resistant travel backpack with laptop compartment",
        stock: 85,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Yoga Mat",
        price: 24.99,
        description: "Non-slip eco-friendly yoga mat for all types of exercise",
        stock: 110,
        image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Dumbbell Set",
        price: 149.99,
        description: "Adjustable dumbbell set for home strength training",
        stock: 15,
        image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZHVtYmVsbHxlbnwwfHx8fDE3NzU0NTAzNjZ8MA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "Noise Cancelling Earbuds",
        price: 159.99,
        description: "Compact wireless earbuds with active noise cancellation",
        stock: 90,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Portable Power Bank",
        price: 45.99,
        description: "20,000mAh high-capacity portable charger",
        stock: 130,
        image: "https://images.unsplash.com/photo-1687007081879-7c98c5d2487f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cG9ydGFibGUlMjBwb3dlciUyMGJhbmt8ZW58MHx8fHwxNzc1NDUwMzY3fDA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "External SSD",
        price: 119.99,
        description: "1TB USB-C portable external solid state drive",
        stock: 40,
        image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Gaming Chair",
        price: 249.99,
        description: "Ergonomic high-back racing style gaming chair",
        stock: 12,
        image: "https://images.unsplash.com/photo-1670946839270-cc4febd43b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z2FtaW5nJTIwY2hhaXJ8ZW58MHx8fHwxNzc1NDUwMzM0fDA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "Smart Light Bulbs",
        price: 34.99,
        description: "Color-changing LED smart bulbs compatible with Alexa/Google",
        stock: 250,
        image: "https://images.unsplash.com/photo-1711006155490-ec01a0ecf0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c21hcnQlMjBsaWdodCUyMGJ1bGJ8ZW58MHx8fHwxNzc1NDUwMzM1fDA&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "Electric Toothbrush",
        price: 79.99,
        description: "Sonic rechargeable electric toothbrush with smart sensor",
        stock: 55,
        image: "https://images.unsplash.com/photo-1612181819081-950d35f4d826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjB0b290aGJydXNofGVufDB8fHx8MTc3NTQ1MDMzNnww&ixlib=rb-4.1.0&q=60&w=400"
    },
    {
        name: "Desk Lamp",
        price: 19.99,
        description: "Dimmable LED desk lamp with USB charging port",
        stock: 180,
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Bluetooth Speaker",
        price: 54.99,
        description: "Waterproof portable Bluetooth speaker with deep bass",
        stock: 95,
        image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Winter Jacket",
        price: 129.99,
        description: "Insulated waterproof winter parka with hood",
        stock: 25,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=60&w=400"
    },
    {
        name: "Sunglasses",
        price: 15.99,
        description: "Classic polarized sunglasses for men and women",
        stock: 300,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=60&w=400"
    }
];

const seedProducts = async () => {
    try {
        await connectDB();
        
        await Product.deleteMany({});
        await Product.insertMany(products);
        
        console.log('Seeding complete. Added 23 products with images.');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
