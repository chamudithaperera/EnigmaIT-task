import React, { useState } from 'react';
import { login as loginRequest } from '../api/authApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await loginRequest({ email: email.trim(), password });
      setSuccess('Logged in successfully.');
      setPassword('');
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Login failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f7f7fb' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>Recipe App</h1>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ color: '#111', fontWeight: 600, borderBottom: '2px solid #6c5ce7' }}>Login</span>
          <a href="/register" style={{ textDecoration: 'none', color: '#6b6b76' }}>Register</a>
        </div>

        {error && (
          <div style={{ background: '#ffe5e5', color: '#a40000', padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: '#eaffea', color: '#146c2e', padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 14 }}
          />

          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 18 }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#6c5ce7',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>

          <p style={{ marginTop: 16, fontSize: 14, textAlign: 'center' }}>
            Don't have an account? <a href="/register" style={{ color: '#6c5ce7' }}>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;


