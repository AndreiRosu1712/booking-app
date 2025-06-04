import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ManagerHotelRooms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [single, setSingle] = useState(0);
  const [doubleR, setDoubleR] = useState(0);
  const [triple, setTriple] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/hotels/${id}`).then(res => {
      setHotel(res.data);
      setSingle(res.data.singleRoomCount || 0);
      setDoubleR(res.data.doubleRoomCount || 0);
      setTriple(res.data.tripleRoomCount || 0);
      setLoading(false);
    });
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.put(`/hotels/${id}`, {
      ...hotel,
      singleRoomCount: single,
      doubleRoomCount: doubleR,
      tripleRoomCount: triple,
      pretNoapte: Number(hotel.pretNoapte)
    });
    alert('Numărul de camere a fost salvat!');
    navigate(-1);
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        color: '#003580',
        fontSize: '1.2rem',
        fontWeight: '500'
      }}>
        Se încarcă...
      </div>
    </div>
  );

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ 
        color: '#003580',
        fontSize: '1.8rem',
        fontWeight: '600',
        marginBottom: '1.5rem'
      }}>
        Gestionează camerele pentru <span style={{ color: '#0071c2' }}>{hotel.nume}</span>
      </h2>

      <form onSubmit={handleSave} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem' 
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{ 
            fontWeight: '600',
            color: '#444',
            fontSize: '1rem'
          }}>
            Preț pe noapte:
          </label>
          <input
            type="number"
            min="1"
            value={hotel.pretNoapte || ''}
            onChange={e => setHotel({ ...hotel, pretNoapte: e.target.value })}
            style={{ 
              padding: '0.8rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            required
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{ 
            fontWeight: '600',
            color: '#444',
            fontSize: '1rem'
          }}>
            Camere Single:
          </label>
          <input
            type="number"
            min="0"
            value={single}
            onChange={e => setSingle(Number(e.target.value))}
            style={{ 
              padding: '0.8rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            required
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{ 
            fontWeight: '600',
            color: '#444',
            fontSize: '1rem'
          }}>
            Camere Double:
          </label>
          <input
            type="number"
            min="0"
            value={doubleR}
            onChange={e => setDoubleR(Number(e.target.value))}
            style={{ 
              padding: '0.8rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            required
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label style={{ 
            fontWeight: '600',
            color: '#444',
            fontSize: '1rem'
          }}>
            Camere Triple:
          </label>
          <input
            type="number"
            min="0"
            value={triple}
            onChange={e => setTriple(Number(e.target.value))}
            style={{ 
              padding: '0.8rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            required
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: '#003580',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
          >
            Salvează camerele
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
          >
            Anulează
          </button>
        </div>
      </form>
    </div>
  );
}