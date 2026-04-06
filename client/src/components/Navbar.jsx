import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </span>
          <span className="brand-text">ShopVerse</span>
        </Link>

        <div className="navbar-links">
          <Link to="/shop" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <div className="auth-nav-section">
            {user ? (
              <div className="user-dropdown">
                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">Log In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
