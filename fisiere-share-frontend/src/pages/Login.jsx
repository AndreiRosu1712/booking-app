import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
// import './Login.css';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [parola, setParola] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { identifier, parola });
      const { id, rol } = res.data;
      if (!id || !rol) {
        throw new Error("Răspuns invalid de la server: ID sau rol lipsă");
      }
      localStorage.setItem("idClient", id);
      localStorage.setItem("rol", rol);
      setTimeout(() => {
        if (rol === 'manager') {
          navigate('/manager-hotels');
        } else {
          navigate('/home');
        }
      }, 100);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Eroare la autentificare. Vă rugăm să verificați datele de conectare.");
      } else if (err.request) {
        setError("Nu s-a primit răspuns de la server. Vă rugăm să verificați conexiunea la internet.");
      } else {
        setError("Eroare la autentificare: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        width: '100%',
        maxWidth: 410,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 420
      }}>
        <h2 style={{
          color: '#003580',
          fontSize: '2.2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          Autentificare
        </h2>
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: 10,
            marginBottom: '1.2rem',
            fontSize: '1rem',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(220,38,38,0.08)'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
          <div>
            <label htmlFor="identifier" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#444',
              fontWeight: 500,
              fontSize: '1.05rem'
            }}>
              Username sau Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="Introduceți username-ul sau email-ul"
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '1.5px solid #e0e0e0',
                borderRadius: 10,
                fontSize: '1.08rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#444',
              fontWeight: 500,
              fontSize: '1.05rem'
            }}>
              Parolă
            </label>
            <input
              id="password"
              type="password"
              value={parola}
              onChange={e => setParola(e.target.value)}
              placeholder="Introduceți parola"
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '1.5px solid #e0e0e0',
                borderRadius: 10,
                fontSize: '1.08rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(90deg, #003580 60%, #0071c2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '1.1rem',
              fontWeight: 700,
              fontSize: '1.08rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
              letterSpacing: 0.5,
              opacity: loading ? 0.7 : 1,
              marginTop: '0.5rem'
            }}
          >
            {loading ? 'Se autentifică...' : 'Autentificare'}
          </button>
        </form>
        <div style={{
          marginTop: '2.2rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '1.05rem',
          width: '100%'
        }}>
          <span>Nu aveți cont?{' '}
            <a href="/register" style={{
              color: '#0071c2',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#003580'}
            onMouseOut={e => e.target.style.color = '#0071c2'}
            >
              Înregistrați-vă
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
