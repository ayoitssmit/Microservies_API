import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAdd = async () => {
    await addItem(product._id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
        <p>Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-secondary">← Back to Products</Link>
      </div>
    );
  }

  return (
    <section className="product-detail-page">
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="product-detail-card">
        <div className="product-detail-image">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-img-large"
            onLoad={(e) => e.target.classList.add('loaded')}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/600x400?text=Product';
              e.target.classList.add('loaded'); // Ensure it shows the placeholder
            }}
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-price">${product.price.toFixed(2)}</div>

          <div className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>

          {product.stock > 0 && (
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >−</button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAdd}>
                {added ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
