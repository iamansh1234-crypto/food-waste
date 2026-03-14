import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseEnabled, getStorageKey } from '../lib/supabase';
import { User, Hash, DoorOpen, CheckCircle2, Clock, Utensils } from 'lucide-react';

function nowISO() { return new Date().toISOString(); }

interface LocalLog {
  student_id: string; name: string; room_no: string; scanned_at: string;
}

const MEAL_META: Record<string, { emoji: string; color: string; bg: string; time: string }> = {
  breakfast: { emoji: '🌅', color: '#92400e', bg: '#fffbeb', time: '7:30 – 9:00 AM' },
  lunch:     { emoji: '☀️', color: '#14532d', bg: '#f0fdf4', time: '12:30 – 2:00 PM' },
  dinner:    { emoji: '🌙', color: '#1e3a5f', bg: '#eff6ff', time: '8:00 – 9:30 PM' },
};

export default function Attend() {
  const [searchParams] = useSearchParams();
  const meal = (searchParams.get('meal') || 'lunch').toLowerCase();
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [studentId, setStudentId] = useState('');
  const [name, setName]           = useState('');
  const [roomNo, setRoomNo]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [message, setMessage]     = useState('');

  const meta = MEAL_META[meal] || MEAL_META.lunch;

  const logs = useMemo(() => {
    const stored = localStorage.getItem(getStorageKey(meal, date));
    if (!stored) return [] as LocalLog[];
    try { return JSON.parse(stored) as LocalLog[]; } catch { return [] as LocalLog[]; }
  }, [meal, date, message]);

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const handleAttend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(''); setSuccess(false);
    const id = studentId.trim();
    if (!id) { setMessage('Please provide your student ID.'); return; }
    setIsLoading(true);

    if (isSupabaseEnabled) {
      const { error } = await supabase.from('attendance_logs').insert([{
        student_id: id, meal_date: date, meal_type: meal, scanned_at: nowISO(),
      }]);
      if (error) { setMessage(`Error: ${error.message}`); }
      else { setSuccess(true); setMessage('Attendance marked successfully!'); }
    } else {
      const consoleRow: LocalLog = {
        student_id: id, name: name.trim() || 'Anonymous',
        room_no: roomNo.trim() || '—', scanned_at: nowISO(),
      };
      localStorage.setItem(getStorageKey(meal, date), JSON.stringify([...logs, consoleRow]));
      setSuccess(true);
      setMessage('Attendance stored locally.');
    }
    setIsLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .attend-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh; background: #f5f3ef;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 32px 16px 80px; position: relative; overflow: hidden;
        }
        .attend-root::before {
          content: ''; position: fixed; top: -120px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobA 9s ease-in-out infinite alternate;
        }
        .attend-root::after {
          content: ''; position: fixed; bottom: -100px; right: -60px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, #fde68a 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobA 11s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobA {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(22px,30px) scale(1.09); }
        }
        .attend-card {
          position: relative; z-index: 1; width: 100%; max-width: 440px;
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .meal-banner {
          border-radius: 20px; padding: 18px 22px; margin-bottom: 20px;
          display: flex; align-items: center; gap: 14px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .meal-emoji-wrap {
          width: 52px; height: 52px; border-radius: 16px;
          background: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.7rem; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .meal-banner h2 {
          font-family: 'Instrument Serif', serif;
          font-size: 1.4rem; margin: 0 0 2px; line-height: 1.2;
        }
        .meal-banner p { font-size: 0.78rem; opacity: 0.7; margin: 0; }
        .attend-glass {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 24px; padding: 26px 24px 22px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }
        .attend-glass h3 {
          font-family: 'Instrument Serif', serif;
          font-size: 1.35rem; color: #111827; margin: 0 0 4px;
        }
        .attend-glass .sub {
          font-size: 0.78rem; color: #6b7280; margin: 0 0 22px;
        }
        .field-wrap { margin-bottom: 14px; }
        .field-label {
          display: block; font-size: 0.72rem; font-weight: 600;
          color: #374151; margin-bottom: 6px;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .field-inner {
          display: flex; align-items: center; gap: 10px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 13px; padding: 10px 13px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-inner:focus-within {
          border-color: #16a34a; background: #fff;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.11);
        }
        .field-inner svg { color: #9ca3af; flex-shrink: 0; }
        .field-inner input {
          flex:1; border:none; background:transparent; outline:none;
          font-family:'DM Sans',sans-serif; font-size:0.86rem; color:#111827;
        }
        .field-inner input::placeholder { color:#9ca3af; }
        .field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .attend-error {
          background:#fef2f2; border:1px solid #fecaca;
          border-radius:10px; padding:9px 13px;
          font-size:0.78rem; color:#b91c1c; margin-bottom:14px;
        }
        .attend-success {
          background:#f0fdf4; border:1px solid #bbf7d0;
          border-radius:14px; padding:16px;
          text-align:center; margin-bottom:14px;
          animation: popIn 0.35s ease;
        }
        .attend-success .tick { font-size:2.5rem; margin-bottom:6px; }
        .attend-success strong {
          display:block; font-size:1rem; color:#14532d; margin-bottom:3px;
        }
        .attend-success span { font-size:0.78rem; color:#6b7280; }
        @keyframes popIn {
          from { transform:scale(0.88); opacity:0; }
          to   { transform:scale(1); opacity:1; }
        }
        .attend-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:14px; border-radius:14px; border:none;
          background:linear-gradient(135deg,#15803d 0%,#16a34a 50%,#22c55e 100%);
          color:#fff; font-family:'DM Sans',sans-serif;
          font-size:0.92rem; font-weight:700; cursor:pointer;
          box-shadow:0 6px 20px rgba(22,163,74,0.3);
          transition:all 0.2s; position:relative; overflow:hidden;
        }
        .attend-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%);
          pointer-events:none;
        }
        .attend-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(22,163,74,0.36); }
        .attend-btn:active { transform:scale(0.98); }
        .attend-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .mode-badge {
          display:inline-flex; align-items:center; gap:5px;
          font-size:0.68rem; color:#6b7280; background:#f3f4f6;
          border:1px solid #e5e7eb; border-radius:999px; padding:3px 10px;
          margin-top:14px;
        }
        .divider { height:1px; background:linear-gradient(90deg,transparent,#e5e7eb,transparent); margin:18px 0; }
        .log-box {
          background:#f9fafb; border:1px solid #e5e7eb;
          border-radius:16px; padding:14px;
        }
        .log-box h4 {
          font-size:0.78rem; font-weight:700; color:#374151; margin:0 0 10px;
          display:flex; align-items:center; gap:6px;
        }
        .log-entry {
          display:flex; align-items:center; gap:9px;
          padding:7px 0; border-bottom:1px solid #f3f4f6;
        }
        .log-entry:last-child { border-bottom:none; }
        .log-avatar {
          width:30px; height:30px; border-radius:50%;
          background:#dcfce7; color:#15803d;
          font-size:0.72rem; font-weight:700;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .log-name { font-size:0.78rem; font-weight:600; color:#374151; }
        .log-room { font-size:0.7rem; color:#9ca3af; }
        .log-time { font-size:0.7rem; color:#9ca3af; margin-left:auto; }
      `}</style>

      <div className="attend-root">
        <div className="attend-card">

          {/* Meal banner */}
          <div className="meal-banner" style={{ background: meta.bg }}>
            <div className="meal-emoji-wrap">{meta.emoji}</div>
            <div>
              <h2 style={{ color: meta.color }}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)} Check-in
              </h2>
              <p style={{ color: meta.color }}>
                <Clock size={11} style={{ display:'inline', marginRight:4 }} />
                {meta.time} &nbsp;·&nbsp; {formattedDate}
              </p>
            </div>
          </div>

          <div className="attend-glass">
            <h3>Mark Your Attendance</h3>
            <p className="sub">Enter your details to confirm you're eating today</p>

            {success ? (
              <div className="attend-success">
                <div className="tick">✅</div>
                <strong>You're all set!</strong>
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleAttend}>
                <div className="field-wrap">
                  <label className="field-label">Student ID *</label>
                  <div className="field-inner">
                    <Hash size={15} />
                    <input value={studentId} onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. S12345" required />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-wrap">
                    <label className="field-label">Name</label>
                    <div className="field-inner">
                      <User size={15} />
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
                    </div>
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Room No.</label>
                    <div className="field-inner">
                      <DoorOpen size={15} />
                      <input value={roomNo} onChange={(e) => setRoomNo(e.target.value)} placeholder="Optional" />
                    </div>
                  </div>
                </div>

                {message && !success && <div className="attend-error">{message}</div>}

                <button type="submit" disabled={isLoading} className="attend-btn">
                  {isLoading
                    ? 'Marking…'
                    : <><CheckCircle2 size={18} /> Mark Attendance</>}
                </button>

                <div style={{ textAlign:'center' }}>
                  <span className="mode-badge">
                    <Utensils size={10} />
                    {isSupabaseEnabled ? 'Syncing to Supabase' : 'Saving locally'}
                  </span>
                </div>
              </form>
            )}

            {logs.length > 0 && (
              <>
                <div className="divider" />
                <div className="log-box">
                  <h4><Clock size={13} /> Local attendance ({logs.length})</h4>
                  <div style={{ maxHeight: 160, overflowY: 'auto' }}>
                    {logs.map((entry, i) => (
                      <div key={i} className="log-entry">
                        <div className="log-avatar">{entry.name?.[0]?.toUpperCase() ?? '?'}</div>
                        <div>
                          <p className="log-name">{entry.student_id} — {entry.name}</p>
                          <p className="log-room">Room {entry.room_no}</p>
                        </div>
                        <span className="log-time">
                          {new Date(entry.scanned_at).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}