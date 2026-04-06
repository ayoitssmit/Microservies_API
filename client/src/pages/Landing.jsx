import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Tech</h1>
          <p className="hero-subtitle">
            Discover premium gadgets and electronics curated for the modern enthusiast. 
            Experience unparalleled quality and design.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-large">
              Shop Now
            </Link>
            {!user && (
              <Link to="/signup" className="btn btn-secondary btn-large">
                Create Account
              </Link>
            )}
          </div>
        </div>
        <div className="hero-graphic">
          {/* Abstract graphic representation */}
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
          <div className="abstract-shape shape-3"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h3>Global Logistics</h3>
          <p>Reliable and efficient shipping solutions tailored to your needs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Secure Transactions</h3>
          <p>Advanced encryption protocols ensuring your data remains protected.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3>Curated Quality</h3>
          <p>Exclusively sourced products that meet rigorous standards of excellence.</p>
        </div>
      </section>
    </div>
  );
}
