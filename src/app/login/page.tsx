'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const USERS: Record<string, string> = {
  Suryansh: '@Shreya2803',
  Shreya: '@Shreya2803',
};

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f2f2f2';
  }, [darkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (USERS[userId] && USERS[userId] === password) {
      localStorage.setItem('loggedInUser', userId);
      router.push('/notes');
    } else {
      setError('Invalid credentials. Try again!');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: darkMode ? '#121212' : '#f2f2f2',
        color: darkMode ? '#fff' : '#000',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 12px',
          backgroundColor: darkMode ? '#333' : '#ddd',
          color: darkMode ? '#fff' : '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* App Title */}
      <h1
        style={{
          marginBottom: '30px',
          fontSize: '2rem',
          textAlign: 'center',
          color: '#ff69b4',
        }}
      >
        Love Note App 💌
      </h1>

      {/* Login Box */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: darkMode ? '#1e1e1e' : '#fff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: darkMode
            ? '0 0 20px rgba(255, 255, 255, 0.1)'
            : '0 0 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <form onSubmit={handleLogin}>
          {/* User ID input */}
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: darkMode ? '#2c2c2c' : '#fff',
              color: darkMode ? '#fff' : '#000',
              fontSize: '1rem',
            }}
          />

          {/* Password input with show/hide */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                marginBottom: '20px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: darkMode ? '#2c2c2c' : '#fff',
                color: darkMode ? '#fff' : '#000',
                fontSize: '1rem',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: darkMode ? '#fff' : '#000',
              }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff69b4',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Login
          </button>

          {/* Error message */}
          {error && (
            <p style={{ color: 'red', marginTop: '12px', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
