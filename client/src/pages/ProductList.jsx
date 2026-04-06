import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(productId);
    await addItem(productId);
    setAddingId(null);
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
        <p>Loading products…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Products Found</h2>
        <p>The store is empty. Add some products via the API first.</p>
      </div>
    );
  }

  return (
    <section className="product-list-page">
      <div className="page-header">
        <h1>Our Products</h1>
        <p className="subtitle">Discover amazing items at great prices</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="product-card">
            <div className="product-card-image">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-img"
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x200?text=Product';
                  e.target.classList.add('loaded'); // Ensure it shows the placeholder
                }}
              />
            </div>
            <div className="product-card-body">
              <h3 className="product-card-title">{product.name}</h3>
              <p className="product-card-desc">{product.description}</p>
              <div className="product-card-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              <button
                className="btn btn-primary btn-add-cart"
                onClick={(e) => handleAdd(e, product._id)}
                disabled={addingId === product._id || product.stock === 0}
              >
                {addingId === product._id ? 'Adding…' : 'Add to Cart'}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
