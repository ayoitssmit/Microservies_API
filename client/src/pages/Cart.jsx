import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, cartTotal, loading, removeItem } = useCart();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
        <p>Loading cart…</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-cart-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Explore our curated collection and add items to your cart.</p>
        <Link to="/shop" className="btn btn-primary">Browse Collection</Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p className="subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-image">
                <div className="product-placeholder-img small">
                  {item.product?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              </div>
              <div className="cart-item-info">
                <h3>{item.product?.name || 'Unknown Product'}</h3>
                <p className="cart-item-price">${(item.product?.price || 0).toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="cart-item-total">
                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.product?._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
