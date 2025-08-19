import React, { useState } from 'react';
import { register as registerRequest } from '../api/authApi';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerRequest({ name: name.trim(), email: email.trim(), password });
      setSuccess('Account created successfully. You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Registration failed';
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
          <a href="/login" style={{ textDecoration: 'none', color: '#6b6b76' }}>Login</a>
          <span style={{ color: '#111', fontWeight: 600, borderBottom: '2px solid #6c5ce7' }}>Register</span>
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
          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 14 }}
          />

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
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: 14 }}
          />

          <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>

          <p style={{ marginTop: 16, fontSize: 14, textAlign: 'center' }}>
            Already have an account? <a href="/login" style={{ color: '#6c5ce7' }}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;


