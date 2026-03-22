const products = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        description: "High quality noise-canceling wireless headphones",
        stock: 50
    },
    {
        name: "Mechanical Keyboard",
        price: 129.99,
        description: "RGB mechanical keyboard with tactile switches",
        stock: 30
    },
    {
        name: "Gaming Mouse",
        price: 59.99,
        description: "Ergonomic gaming mouse with customizable buttons",
        stock: 100
    }
];

const seedProducts = async () => {
    for (const product of products) {
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            console.log('Added product:', data.name);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }
    console.log('Seeding complete.');
};

seedProducts();
