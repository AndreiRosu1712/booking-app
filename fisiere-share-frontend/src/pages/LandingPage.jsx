// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8f9fa 60%, #e7f0fa 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 32px rgba(0,0,0,0.13)',
        padding: '3rem 3.5rem 2.5rem 3.5rem',
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 320
      }}>
        <h1 style={{
          color: '#003580',
          fontSize: '2.4rem',
          fontWeight: 800,
          marginBottom: '2.2rem',
          letterSpacing: 0.5,
          textAlign: 'center',
          fontFamily: 'inherit'
        }}>
          Bun venit!
        </h1>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
          <Link to="/login">
            <button style={{
              background: 'linear-gradient(90deg, #003580 60%, #0071c2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '1rem 2.2rem',
              fontWeight: 700,
              fontSize: '1.08rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
              letterSpacing: 0.5,
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem'
            }}>
              <span role="img" aria-label="login">🔑</span> Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              background: 'linear-gradient(90deg, #0071c2 60%, #003580 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '1rem 2.2rem',
              fontWeight: 700,
              fontSize: '1.08rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
              letterSpacing: 0.5,
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem'
            }}>
              <span role="img" aria-label="register">📝</span> Register
            </button>
          </Link>
        </div>
        <div style={{ color: '#888', fontSize: '1.05rem', marginTop: '1.5rem', textAlign: 'center' }}>
          Platformă de rezervări hoteluri<br />Inspirată de Booking.com
        </div>
      </div>
    </div>
  );
}
