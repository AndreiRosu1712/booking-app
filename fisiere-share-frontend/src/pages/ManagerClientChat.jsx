import { useParams } from 'react-router-dom';

export default function ManagerClientChat() {
  const { id, idClient } = useParams();

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '2rem auto', 
      padding: '2rem',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h2 style={{ 
          margin: 0,
          color: '#003580',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Conversație cu clientul {idClient}
        </h2>
      </div>

      <div style={{ 
        minHeight: 400,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          color: '#666',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          Funcționalitatea de chat urmează să fie implementată.
        </div>
      </div>

      <form style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Scrie un mesaj..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            padding: '12px 24px',
            background: '#003580',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontSize: '1rem'
          }}
        >
          Trimite
        </button>
      </form>
    </div>
  );
}