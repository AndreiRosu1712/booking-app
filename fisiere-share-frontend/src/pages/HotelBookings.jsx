import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

console.log('HotelBookings.jsx loaded');

export default function HotelBookings() {
  const { id } = useParams(); // id-ul hotelului
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log('URL id:', id);

  useEffect(() => {
    api.get(`/bookigs/hotel/${id}`).then(res => {
      setBookings(res.data);
      console.log('BOOKINGS:', res.data);
      setLoading(false);
    });
  }, [id]);

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
      maxWidth: 1200, 
      margin: '2rem auto',
      padding: '0 1rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          color: '#003580',
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          Status rezervări
        </h2>
        <p style={{ 
          fontWeight: '600',
          fontSize: '1.2rem',
          color: '#444'
        }}>
          Număr rezervări: <span style={{ color: '#003580' }}>{bookings.length}</span>
        </p>
      </div>

      <div>
        {bookings.length === 0 && (
          <div style={{
            background: '#fff',
            color: '#666',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            Nu există rezervări pentru acest hotel.
          </div>
        )}
        {bookings.map(b => (
          b.camereRezervate && Array.isArray(b.camereRezervate) ? (
            b.camereRezervate.map((c, idx) => (
              <div
                key={b.id + '-' + idx}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2rem',
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={() => navigate(`/manager-hotel/${id}/client/${b.idClient}`)}
                  style={{
                    backgroundColor: '#003580',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Conversație
                </button>
                <div style={{ flex: 2, minWidth: 180 }}>
                  <b style={{ 
                    color: '#003580',
                    fontSize: '1.1rem',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {b.numeClient} {b.prenumeClient}
                  </b>
                  <div style={{ 
                    color: '#666',
                    fontSize: '0.95rem'
                  }}>
                    {b.emailClient} | {b.telefonClient}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <b style={{ color: '#444' }}>Tip cameră:</b>
                  <div style={{ color: '#666', marginTop: '0.3rem' }}>
                    {c.tipCamera || '-'}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <b style={{ color: '#444' }}>Nr. Camere:</b>
                  <div style={{ color: '#666', marginTop: '0.3rem' }}>
                    {c.cantitate || '-'}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <b style={{ color: '#444' }}>Preț/cameră:</b>
                  <div style={{ color: '#003580', fontWeight: '600', marginTop: '0.3rem' }}>
                    {c.totalPerCamera || '-'} RON
                  </div>
                </div>
                <div style={{ flex: 1.5, minWidth: 160 }}>
                  <b style={{ color: '#444' }}>Perioadă:</b>
                  <div style={{ color: '#666', marginTop: '0.3rem' }}>
                    {b.dataCheckIn ? new Date(b.dataCheckIn).toLocaleDateString() : '-'} - {b.dataCheckOut ? new Date(b.dataCheckOut).toLocaleDateString() : '-'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              key={b.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}
            >
              <button
                onClick={() => navigate(`/manager-hotel/${id}/client/${b.idClient}`)}
                style={{
                  backgroundColor: '#003580',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
              >
                Conversație
              </button>
              <div>
                <b style={{ 
                  color: '#003580',
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {b.numeClient} {b.prenumeClient}
                </b>
                <div style={{ 
                  color: '#666',
                  fontSize: '0.95rem',
                  marginBottom: '0.5rem'
                }}>
                  {b.emailClient} | {b.telefonClient}
                </div>
                <div style={{ color: '#444' }}>
                  <b>Perioadă:</b> {b.dataCheckIn ? new Date(b.dataCheckIn).toLocaleDateString() : '-'} - {b.dataCheckOut ? new Date(b.dataCheckOut).toLocaleDateString() : '-'}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
