// src/pages/ManagerChatPage.js
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const avatarStyle = {
  width: 38,
  height: 38,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '1.1rem',
  marginRight: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
};

export default function ManagerChatPage() {
  const { idHotel, idClient } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    api.get(`/conversations/hotel/${idHotel}/client/${idClient}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, [idHotel, idClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const idExpeditor = idHotel;
    try {
      await api.post('/conversations/send', {
        idHotel,
        idClient,
        idExpeditor,
        text: newMessage,
        expeditor: 'manager'
      });
      setNewMessage('');
      const res = await api.get(`/conversations/hotel/${idHotel}/client/${idClient}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8f9fa 60%, #e7f0fa 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '2rem 0'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 700,
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 32px rgba(0,0,0,0.13)',
        padding: 0,
        margin: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 600
      }}>
        {/* Header sticky */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 2,
          padding: '2rem 2rem 1rem 2rem',
        }}>
          <h2 style={{
            color: '#003580',
            fontWeight: 700,
            fontSize: '2rem',
            margin: 0,
            letterSpacing: 0.5
          }}>
            Conversație cu clientul <span style={{ color: '#0071c2' }}>{idClient}</span>
          </h2>
          <div style={{ color: '#888', fontSize: '1rem', marginTop: 4 }}>
            Chat direct cu clientul tău
          </div>
        </div>
        {/* Chat area */}
        <div style={{
          background: '#f4f6fb',
          borderRadius: 16,
          minHeight: 320,
          maxHeight: 400,
          overflowY: 'auto',
          padding: '2rem 2rem 1.5rem 2rem',
          margin: '0 2rem 0 2rem',
          border: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          marginBottom: '1.5rem',
          marginTop: '1.5rem',
        }}>
          {messages.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', fontStyle: 'italic' }}>
              Nu există mesaje încă.
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: msg.expeditor === 'manager' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                animation: 'fadeIn 0.4s',
              }}
            >
              {/* Avatar */}
              <div style={{
                ...avatarStyle,
                background: msg.expeditor === 'manager' ? '#003580' : '#e7f0fa',
                color: msg.expeditor === 'manager' ? '#fff' : '#003580',
                marginLeft: msg.expeditor === 'manager' ? 12 : 0,
                marginRight: msg.expeditor === 'manager' ? 0 : 12,
              }}>
                {msg.expeditor === 'manager' ? 'H' : 'C'}
              </div>
              {/* Bubble */}
              <div style={{
                background: msg.expeditor === 'manager' ? '#003580' : '#fff',
                color: msg.expeditor === 'manager' ? '#fff' : '#003580',
                borderRadius: msg.expeditor === 'manager' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                padding: '1rem 1.3rem',
                fontSize: '1.08rem',
                fontWeight: 500,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                minWidth: 80,
                maxWidth: 340,
                wordBreak: 'break-word',
                marginBottom: 2,
                position: 'relative',
                transition: 'background 0.2s',
              }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', marginRight: 8, opacity: 0.7 }}>
                  {msg.expeditor === 'manager' ? 'Hotel' : 'Client'}:
                </span>
                {msg.text}
                <div style={{
                  fontSize: '0.82rem',
                  color: msg.expeditor === 'manager' ? '#e7f0fa' : '#888',
                  marginTop: 8,
                  opacity: 0.8,
                  textAlign: 'right',
                  fontWeight: 400
                }}>
                  {msg.dataTrimitere ? new Date(msg.dataTrimitere).toLocaleString() : ''}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input bar sticky bottom */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          padding: '1.5rem 2rem 2rem 2rem',
          borderTop: '1px solid #e0e0e0',
          background: '#fff',
          borderRadius: '0 0 20px 20px',
          position: 'sticky',
          bottom: 0,
          zIndex: 2
        }}>
          <input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj..."
            style={{
              flex: 1,
              padding: '1.1rem',
              borderRadius: 10,
              border: '1.5px solid #e0e0e0',
              fontSize: '1.08rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: 'linear-gradient(90deg, #003580 60%, #0071c2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '0 2.2rem',
              fontWeight: 700,
              fontSize: '1.08rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
              letterSpacing: 0.5
            }}
          >
            Trimite
          </button>
        </div>
      </div>
    </div>
  );
}
