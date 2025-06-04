import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [rol, setRol] = useState('client');
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [parola, setParola] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', {
        rol,
        nume,
        prenume,
        mail,
        username,
        parola
      });
      alert('Cont creat cu succes!');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Eroare la înregistrare.');
      } else if (err.request) {
        setError('Nu s-a primit răspuns de la server.');
      } else {
        setError('Eroare la înregistrare: ' + err.message);
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
        maxWidth: 430,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 520
      }}>
        <h2 style={{
          color: '#003580',
          fontSize: '2.2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          letterSpacing: 0.5,
          textAlign: 'center',
        }}>
          Înregistrare
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
        <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Rol</label>
            <select value={rol} onChange={e => setRol(e.target.value)} style={{
              width: '100%',
              padding: '1rem',
              border: '1.5px solid #e0e0e0',
              borderRadius: 10,
              fontSize: '1.08rem',
              background: '#f8f9fa',
              color: '#003580',
              fontWeight: 600,
              outline: 'none',
              marginBottom: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }}>
              <option value="client">Client</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Nume</label>
            <input value={nume} onChange={e => setNume(e.target.value)} required placeholder="Nume" style={{
              width: '100%', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '1.08rem', transition: 'border-color 0.2s', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Prenume</label>
            <input value={prenume} onChange={e => setPrenume(e.target.value)} required placeholder="Prenume" style={{
              width: '100%', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '1.08rem', transition: 'border-color 0.2s', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Email</label>
            <input value={mail} onChange={e => setMail(e.target.value)} required placeholder="Email" type="email" style={{
              width: '100%', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '1.08rem', transition: 'border-color 0.2s', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" style={{
              width: '100%', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '1.08rem', transition: 'border-color 0.2s', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: '#444', fontWeight: 500, fontSize: '1.05rem' }}>Parolă</label>
            <input value={parola} onChange={e => setParola(e.target.value)} required placeholder="Parolă" type="password" style={{
              width: '100%', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '1.08rem', transition: 'border-color 0.2s', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }} />
          </div>
          <button type="submit" disabled={loading} style={{
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
          }}>
            {loading ? 'Se înregistrează...' : 'Înregistrare'}
          </button>
        </form>
        <div style={{
          marginTop: '2.2rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '1.05rem',
          width: '100%'
        }}>
          <span>Ai deja cont?{' '}
            <a href="/login" style={{
              color: '#0071c2',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#003580'}
            onMouseOut={e => e.target.style.color = '#0071c2'}
            >
              Autentifică-te
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
