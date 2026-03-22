import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, placeOrder, loading } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const order = await placeOrder();
    if (order) {
      setOrderId(order._id);
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: <code>{orderId}</code></p>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Nothing to Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <section className="checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <p className="subtitle">Review your order before placing it</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-items">
          <h2>Order Items</h2>
          {cartItems.map((item) => (
            <div className="checkout-item" key={item._id}>
              <div className="checkout-item-info">
                <span className="checkout-item-name">{item.product?.name || 'Unknown'}</span>
                <span className="checkout-item-qty">× {item.quantity}</span>
              </div>
              <span className="checkout-item-total">
                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h2>Payment Summary</h2>
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
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order…' : 'Place Order'}
          </button>
          <Link to="/cart" className="btn btn-secondary btn-block">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
