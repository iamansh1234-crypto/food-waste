import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Leaf } from 'lucide-react';

export default function SignIn() {
  const { signIn, hasUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill email and password.'); return; }
    setLoading(true);
    const { success, message } = await signIn({ email: email.trim(), password });
    if (!success) setError(message);
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .auth-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f5f3ef;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
        }
        .auth-root::before {
          content: '';
          position: fixed; top: -140px; left: -100px;
          width: 460px; height: 460px;
          background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobA 9s ease-in-out infinite alternate;
        }
        .auth-root::after {
          content: '';
          position: fixed; bottom: -120px; right: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, #fde68a 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobA 11s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobA {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(24px,32px) scale(1.1); }
        }
        .auth-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 420px;
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(22px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .auth-brand {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 28px; justify-content: center;
        }
        .auth-brand-icon {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #15803d, #22c55e);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(22,163,74,0.35);
        }
        .auth-brand-name {
          font-family: 'Instrument Serif', serif;
          font-size: 1.25rem; color: #14532d; font-weight: 400;
        }
        .auth-heading {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; color: #111827;
          text-align: center; margin: 0 0 6px;
          line-height: 1.15;
        }
        .auth-heading em { font-style: italic; color: #16a34a; }
        .auth-sub {
          text-align: center; font-size: 0.83rem; color: #6b7280;
          margin: 0 0 28px;
        }
        .auth-glass {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 24px;
          padding: 28px 28px 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
        }
        .auth-warn {
          background: #fffbeb; border: 1px solid #fde68a;
          border-radius: 12px; padding: 10px 14px;
          font-size: 0.78rem; color: #92400e; margin-bottom: 18px;
        }
        .auth-warn a { color: #15803d; font-weight: 600; text-decoration: none; }
        .field-wrap { margin-bottom: 16px; }
        .field-label {
          display: block; font-size: 0.75rem; font-weight: 600;
          color: #374151; margin-bottom: 7px; letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .field-inner {
          display: flex; align-items: center; gap: 10px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 14px; padding: 11px 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-inner:focus-within {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
          background: #fff;
        }
        .field-inner svg { color: #9ca3af; flex-shrink: 0; }
        .field-inner input {
          flex: 1; border: none; background: transparent; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #111827;
        }
        .field-inner input::placeholder { color: #9ca3af; }
        .auth-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 9px 13px;
          font-size: 0.78rem; color: #b91c1c; margin-bottom: 14px;
        }
        .auth-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 8px;
          padding: 14px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 20px rgba(22,163,74,0.32);
          transition: all 0.2s ease; position: relative; overflow: hidden;
        }
        .auth-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          pointer-events: none;
        }
        .auth-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(22,163,74,0.38); }
        .auth-btn:active { transform: scale(0.98); }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .auth-footer {
          text-align: center; font-size: 0.8rem; color: #6b7280; margin-top: 18px;
        }
        .auth-footer a { color: #15803d; font-weight: 600; text-decoration: none; }
        .auth-divider {
          height: 1px; background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin: 20px 0;
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon"><Leaf size={20} color="#fff" /></div>
            <span className="auth-brand-name">Hostel Food Saver</span>
          </div>

          <h2 className="auth-heading">Welcome <em>back</em></h2>
          <p className="auth-sub">Sign in to manage your meals</p>

          <div className="auth-glass">
            {!hasUsers && (
              <div className="auth-warn">
                No registered users found. Please <Link to="/signup">sign up</Link> first.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field-wrap">
                <label className="field-label">Email Address</label>
                <div className="field-inner">
                  <Mail size={16} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" required />
                </div>
              </div>

              <div className="field-wrap">
                <label className="field-label">Password</label>
                <div className="field-inner">
                  <Lock size={16} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" required />
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={!hasUsers || loading} className="auth-btn">
                {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="auth-divider" />
            <p className="auth-footer">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}