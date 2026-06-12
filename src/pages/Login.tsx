import React, { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Başarılı giriş sonrası yönlendirme veya state güncelleme
      } else {
        setError('E-posta veya şifre hatalı.');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'sans-serif',
      padding: '1rem' // Mobil için padding
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '3rem',
        borderRadius: '24px', // Daha yumuşak köşeler
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Daha belirgin gölge
        width: '100%',
        maxWidth: '480px', // Biraz daha geniş
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Moneta Başlığı ve İkon */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            gap: '0.5rem'
        }}>
            <h2 style={{
              fontSize: '2.25rem', // Daha büyük başlık
              fontWeight: '800',
              textAlign: 'center',
              color: '#111827',
              margin: 0
            }}>
              Moneta
            </h2>
            <div style={{
                fontSize: '1.75rem',
                color: '#6b7280' // Cüzdan simgesi rengi
            }}>
                💳 
            </div>
        </div>

        <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '2.5rem',
            marginTop: 0
        }}>
          Giriş Yap
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '12px',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            width: '100%'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
              E-posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ornek@moneta.com"
              style={{
                width: '100%',
                padding: '1rem 1.25rem', // Daha geniş inputlar
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                ':focus': {
                    borderColor: '#2563eb', // Odaklanınca mavi kenarlık
                    borderWidth: '2px'
                }
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                ':focus': {
                    borderColor: '#2563eb',
                    borderWidth: '2px'
                }
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1.1rem',
              backgroundColor: '#1d4ed8', // Daha koyu kurumsal mavi
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '0.75rem',
              transition: 'background-color 0.2s, transform 0.1s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Giriş Yap
          </button>
        </form>

        <div style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#6b7280',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem'
        }}>
            <span>Yeni misiniz?</span>
            <a href="/register" style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '600'
            }}>
                Hesap Oluşturun
            </a>
        </div>

      </div>
    </div>
  );
};