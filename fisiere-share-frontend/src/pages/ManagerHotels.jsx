// src/pages/ManagerHotels.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
// import './ManagerHotels.css';

export default function ManagerHotels() {
  const [hotels, setHotels] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHotel, setNewHotel] = useState({
    nume: '',
    locatie: '',
    pretNoapte: '',
    descriere: '',
    imagine: ''
  });
  const navigate = useNavigate();
  const idManager = localStorage.getItem('idClient');

  useEffect(() => {
    if (!idManager) return;
    loadHotels();
  }, [idManager]);

  const loadHotels = async () => {
    try {
      const res = await api.get(`/hotels/manager/${idManager}`);
      setHotels(res.data);
    } catch (err) {
      console.error('Error loading hotels:', err);
      alert('Eroare la încărcarea hotelurilor');
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/manager/${idManager}/hotels`, {
        ...newHotel,
        pretNoapte: parseFloat(newHotel.pretNoapte)
      });
      setShowAddForm(false);
      setNewHotel({
        nume: '',
        locatie: '',
        pretNoapte: '',
        descriere: '',
        imagine: ''
      });
      loadHotels();
    } catch (err) {
      console.error('Error adding hotel:', err);
      alert('Eroare la adăugarea hotelului');
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      await api.delete(`/api/manager/${idManager}/hotels/${id}`);
      loadHotels();
    } catch (err) {
      console.error('Error deleting hotel:', err);
      alert('Eroare la ștergerea hotelului');
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ 
          color: '#003580',
          fontSize: '1.8rem',
          fontWeight: '600',
          margin: 0
        }}>Hotelurile tale</h2>
        <button 
          style={{
            backgroundColor: '#003580',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Anulează' : 'Adaugă Hotel Nou'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddHotel} style={{ 
          backgroundColor: '#fff', 
          padding: '2rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <input
              type="text"
              placeholder="Nume Hotel"
              value={newHotel.nume}
              onChange={(e) => setNewHotel({...newHotel, nume: e.target.value})}
              required
              style={{ 
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
            />
            <input
              type="text"
              placeholder="Locație"
              value={newHotel.locatie}
              onChange={(e) => setNewHotel({...newHotel, locatie: e.target.value})}
              required
              style={{ 
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
            />
            <input
              type="number"
              placeholder="Preț per Noapte (RON)"
              value={newHotel.pretNoapte}
              onChange={(e) => setNewHotel({...newHotel, pretNoapte: e.target.value})}
              required
              style={{ 
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
            />
            <textarea
              placeholder="Descriere"
              value={newHotel.descriere}
              onChange={(e) => setNewHotel({...newHotel, descriere: e.target.value})}
              required
              style={{ 
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                minHeight: '120px',
                resize: 'vertical',
                transition: 'border-color 0.2s'
              }}
            />
            <input
              type="text"
              placeholder="URL Imagine"
              value={newHotel.imagine}
              onChange={(e) => setNewHotel({...newHotel, imagine: e.target.value})}
              style={{ 
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
            />
            <button 
              type="submit" 
              style={{ 
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
              Adaugă Hotel
            </button>
          </div>
        </form>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '2rem' 
      }}>
        {hotels.map(hotel => (
          <div key={hotel.id} style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s'
          }}>
            {hotel.imagine && (
              <img 
                src={hotel.imagine} 
                alt={hotel.nume} 
                style={{ 
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }} 
              />
            )}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ 
                color: '#003580',
                margin: '0 0 0.5rem 0',
                fontSize: '1.4rem',
                fontWeight: '600'
              }}>
                {hotel.nume}
              </h3>
              <p style={{ 
                color: '#666',
                margin: '0.5rem 0',
                fontSize: '1rem'
              }}>
                {hotel.locatie}
              </p>
              <p style={{ 
                color: '#003580',
                fontWeight: '600',
                fontSize: '1.2rem',
                margin: '0.5rem 0'
              }}>
                {hotel.pretNoapte} RON/noapte
              </p>
              <p style={{ 
                color: '#444',
                margin: '1rem 0',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                {hotel.descriere}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button 
                  onClick={() => navigate(`/manager-hotel/${hotel.id}/rooms`)}
                  style={{
                    backgroundColor: '#003580',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Gestionează Hotel
                </button>
                <button
                  onClick={() => navigate(`/manager-hotel/${hotel.id}/bookings`)}
                  style={{
                    backgroundColor: '#0071c2',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Status rezervări
                </button>
                <button 
                  onClick={() => handleDeleteHotel(hotel.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Șterge Hotel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
