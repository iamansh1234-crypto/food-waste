// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, CheckCircle2, XCircle, ChevronDown, Leaf, QrCode, Sparkles } from 'lucide-react';

// export default function StudentHome() {
//   const [isAttending, setIsAttending] = useState<boolean | null>(true);
//   const [portion, setPortion] = useState('Regular');
//   const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const navigate = useNavigate();

//   const handleGenerateQR = () => {
//     const params = new URLSearchParams({
//       date: selectedDate,
//       attending: String(isAttending),
//       portion: isAttending ? portion : 'None',
//     });
//     navigate(`/qrcode?${params.toString()}`);
//   };

//   const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
//     weekday: 'short', month: 'long', day: 'numeric',
//   });

//   return (
//     <>
//       {/* ── Google Fonts ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

//         .shome-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: #f5f3ef;
//           position: relative;
//           overflow-x: hidden;
//         }

//         /* ── Mesh background blobs ── */
//         .shome-root::before {
//           content: '';
//           position: fixed;
//           top: -120px; left: -80px;
//           width: 420px; height: 420px;
//           background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
//           border-radius: 50%;
//           z-index: 0;
//           pointer-events: none;
//           animation: blobFloat 8s ease-in-out infinite alternate;
//         }
//         .shome-root::after {
//           content: '';
//           position: fixed;
//           bottom: -100px; right: -60px;
//           width: 380px; height: 380px;
//           background: radial-gradient(circle, #fde68a 0%, transparent 70%);
//           border-radius: 50%;
//           z-index: 0;
//           pointer-events: none;
//           animation: blobFloat 10s ease-in-out infinite alternate-reverse;
//         }
//         @keyframes blobFloat {
//           from { transform: translate(0, 0) scale(1); }
//           to   { transform: translate(20px, 30px) scale(1.08); }
//         }

//         .shome-inner {
//           position: relative;
//           z-index: 1;
//           padding: 28px 20px 100px;
//           max-width: 480px;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           gap: 22px;
//         }

//         /* ── Header ── */
//         .shome-header h2 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 2rem;
//           line-height: 1.15;
//           color: #14532d;
//           margin: 0 0 4px;
//         }
//         .shome-header h2 em {
//           font-style: italic;
//           color: #16a34a;
//         }
//         .shome-header p {
//           font-size: 0.85rem;
//           color: #6b7280;
//           margin: 0;
//           font-weight: 400;
//         }

//         /* ── Warrior card ── */
//         .warrior-card {
//           background: linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%);
//           border-radius: 20px;
//           padding: 20px 22px;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 8px 32px rgba(20,83,45,0.28), 0 2px 8px rgba(20,83,45,0.15);
//         }
//         .warrior-card::before {
//           content: '🌿';
//           position: absolute;
//           right: -8px; top: -12px;
//           font-size: 6rem;
//           opacity: 0.12;
//           transform: rotate(-20deg);
//           pointer-events: none;
//         }
//         .warrior-card .badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(255,255,255,0.15);
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 999px;
//           padding: 4px 12px;
//           font-size: 0.72rem;
//           font-weight: 600;
//           color: #bbf7d0;
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//           margin-bottom: 10px;
//         }
//         .warrior-card h3 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 1.5rem;
//           color: #fff;
//           margin: 0 0 4px;
//         }
//         .warrior-card p {
//           font-size: 0.78rem;
//           color: rgba(255,255,255,0.6);
//           margin: 0 0 14px;
//         }
//         .warrior-bar-track {
//           background: rgba(0,0,0,0.2);
//           border-radius: 999px;
//           height: 6px;
//           overflow: hidden;
//         }
//         .warrior-bar-fill {
//           background: linear-gradient(90deg, #86efac, #fff);
//           height: 100%;
//           border-radius: 999px;
//           width: 0%;
//           transition: width 1s ease;
//         }

//         /* ── Meal card ── */
//         .meal-card {
//           background: #fff;
//           border-radius: 24px;
//           padding: 24px;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
//           border: 1px solid rgba(0,0,0,0.05);
//         }

//         .meal-card-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 18px;
//           gap: 12px;
//         }
//         .meal-tag {
//           display: inline-block;
//           font-size: 0.65rem;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: #15803d;
//           background: #dcfce7;
//           padding: 3px 10px;
//           border-radius: 999px;
//           margin-bottom: 8px;
//         }
//         .meal-card-top h3 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 1.35rem;
//           color: #111827;
//           margin: 0 0 4px;
//         }
//         .meal-card-top p {
//           font-size: 0.78rem;
//           color: #9ca3af;
//           margin: 0;
//         }

//         /* Date picker pill */
//         .date-pill {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: #f9fafb;
//           border: 1.5px solid #e5e7eb;
//           border-radius: 14px;
//           padding: 8px 12px;
//           cursor: pointer;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           white-space: nowrap;
//         }
//         .date-pill:focus-within {
//           border-color: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
//         }
//         .date-pill input[type="date"] {
//           border: none;
//           background: transparent;
//           font-size: 0.78rem;
//           font-family: 'DM Sans', sans-serif;
//           font-weight: 600;
//           color: #111827;
//           outline: none;
//           width: 110px;
//           cursor: pointer;
//         }

//         /* Selected date info box */
//         .date-info {
//           background: linear-gradient(135deg, #f0fdf4, #fafff7);
//           border: 1px solid #bbf7d0;
//           border-radius: 14px;
//           padding: 12px 16px;
//           margin-bottom: 20px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .date-info-icon {
//           width: 36px; height: 36px;
//           background: #dcfce7;
//           border-radius: 10px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.1rem;
//           flex-shrink: 0;
//         }
//         .date-info strong {
//           display: block;
//           font-size: 0.88rem;
//           font-weight: 700;
//           color: #14532d;
//         }
//         .date-info span {
//           font-size: 0.72rem;
//           color: #6b7280;
//         }

//         /* ── Eating toggle ── */
//         .section-label {
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: #374151;
//           margin: 0 0 10px;
//           letter-spacing: 0.02em;
//         }

//         .toggle-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 10px;
//           margin-bottom: 18px;
//         }
//         .toggle-btn {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           padding: 12px;
//           border-radius: 14px;
//           border: 1.5px solid #e5e7eb;
//           background: #fff;
//           font-size: 0.82rem;
//           font-family: 'DM Sans', sans-serif;
//           font-weight: 600;
//           color: #6b7280;
//           cursor: pointer;
//           transition: all 0.18s ease;
//         }
//         .toggle-btn:hover { border-color: #9ca3af; }

//         .toggle-btn.yes-active {
//           background: linear-gradient(135deg, #f0fdf4, #dcfce7);
//           border-color: #16a34a;
//           color: #14532d;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
//         }
//         .toggle-btn.no-active {
//           background: linear-gradient(135deg, #fff5f5, #fee2e2);
//           border-color: #ef4444;
//           color: #991b1b;
//           box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
//         }

//         /* ── Divider ── */
//         .section-divider {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
//           margin: 4px 0 18px;
//         }

//         /* ── Portion select ── */
//         .portion-wrap {
//           position: relative;
//         }
//         .portion-select {
//           width: 100%;
//           appearance: none;
//           background: #f9fafb;
//           border: 1.5px solid #e5e7eb;
//           border-radius: 14px;
//           padding: 12px 40px 12px 16px;
//           font-size: 0.85rem;
//           font-family: 'DM Sans', sans-serif;
//           font-weight: 500;
//           color: #111827;
//           outline: none;
//           cursor: pointer;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .portion-select:focus {
//           border-color: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
//         }
//         .portion-chevron {
//           position: absolute;
//           right: 14px; top: 50%;
//           transform: translateY(-50%);
//           pointer-events: none;
//           color: #9ca3af;
//         }

//         /* ── QR Button ── */
//         .qr-btn-wrap {
//           margin-top: 20px;
//           padding-top: 20px;
//           border-top: 1px dashed #e5e7eb;
//         }
//         .qr-btn {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 9px;
//           padding: 15px;
//           border-radius: 16px;
//           border: none;
//           background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%);
//           color: #fff;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.92rem;
//           font-weight: 700;
//           cursor: pointer;
//           letter-spacing: 0.02em;
//           box-shadow: 0 6px 20px rgba(22,163,74,0.35), 0 2px 6px rgba(22,163,74,0.2);
//           transition: all 0.2s ease;
//           position: relative;
//           overflow: hidden;
//         }
//         .qr-btn::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
//           pointer-events: none;
//         }
//         .qr-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 28px rgba(22,163,74,0.4), 0 4px 10px rgba(22,163,74,0.25);
//         }
//         .qr-btn:active {
//           transform: translateY(0px) scale(0.98);
//         }
//         .qr-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           transform: none;
//         }
//         .qr-btn-hint {
//           text-align: center;
//           font-size: 0.72rem;
//           color: #9ca3af;
//           margin-top: 8px;
//         }

//         /* ── Shimmer animation on QR btn icon ── */
//         @keyframes pulse-icon {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50%       { opacity: 0.7; transform: scale(0.92); }
//         }
//         .qr-btn svg { animation: pulse-icon 2.4s ease-in-out infinite; }

//         /* ── Staggered fade-in ── */
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(18px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-1 { animation: fadeUp 0.45s ease both 0.05s; }
//         .fade-2 { animation: fadeUp 0.45s ease both 0.15s; }
//         .fade-3 { animation: fadeUp 0.45s ease both 0.25s; }
//       `}</style>

//       <div className="shome-root">
//         <div className="shome-inner">

//           {/* ── Header ── */}
//           <header className="shome-header fade-1">
//             <h2>Welcome <em>back</em> 👋</h2>
//             <p>Reserve your meal below — takes just a second.</p>
//           </header>

//           {/* ── Warrior card ── */}
//           <div className="warrior-card fade-2">
//             <div className="badge">
//               <Leaf size={11} /> Achievement
//             </div>
//             <h3>Waste Warrior</h3>
//             <p>Keep marking meals to climb the leaderboard</p>
//             <div className="warrior-bar-track">
//               <div className="warrior-bar-fill" />
//             </div>
//           </div>

//           {/* ── Meal reservation card ── */}
//           <div className="meal-card fade-3">

//             {/* Top row */}
//             <div className="meal-card-top">
//               <div>
//                 <span className="meal-tag">Upcoming Meal</span>
//                 <h3>Reserve Your Meal</h3>
//                 <p>Pick the date &amp; set your preference</p>
//               </div>
//               <label className="date-pill" title="Select date">
//                 <Calendar size={15} color="#16a34a" />
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   aria-label="Select meal date"
//                 />
//               </label>
//             </div>

//             {/* Date info box */}
//             <div className="date-info">
//               <div className="date-info-icon">🗓️</div>
//               <div>
//                 <strong>{formattedDate}</strong>
//                 <span>Your reservation will be saved for this date</span>
//               </div>
//             </div>

//             {/* Eating toggle */}
//             <p className="section-label">Are you eating today?</p>
//             <div className="toggle-grid">
//               <button
//                 onClick={() => setIsAttending(true)}
//                 className={`toggle-btn ${isAttending === true ? 'yes-active' : ''}`}
//               >
//                 <CheckCircle2 size={17} />
//                 Yes, I am
//               </button>
//               <button
//                 onClick={() => setIsAttending(false)}
//                 className={`toggle-btn ${isAttending === false ? 'no-active' : ''}`}
//               >
//                 <XCircle size={17} />
//                 Skipping
//               </button>
//             </div>

//             {/* Portion size */}
//             {isAttending && (
//               <>
//                 <div className="section-divider" />
//                 <p className="section-label">Portion Size</p>
//                 <div className="portion-wrap">
//                   <select
//                     value={portion}
//                     onChange={(e) => setPortion(e.target.value)}
//                     className="portion-select"
//                   >
//                     <option value="Small">🥗 Small Portion</option>
//                     <option value="Regular">🍽️ Regular Portion</option>
//                     <option value="Large">🫕 Large Portion</option>
//                   </select>
//                   <ChevronDown size={17} className="portion-chevron" />
//                 </div>
//               </>
//             )}

//             {/* QR button */}
//             <div className="qr-btn-wrap">
//               <button
//                 onClick={handleGenerateQR}
//                 disabled={isAttending === null}
//                 className="qr-btn"
//               >
//                 <QrCode size={20} />
//                 Generate Meal QR Code
//                 <Sparkles size={15} style={{ opacity: 0.8 }} />
//               </button>
//               <p className="qr-btn-hint">Show this QR at the dining hall to confirm your meal</p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, XCircle, ChevronDown, Leaf, QrCode, Sparkles, Bell, BellOff } from 'lucide-react';
import {
  registerSW,
  requestNotificationPermission,
  sendLocalNotification,
} from '../lib/useNotification'; // ← adjust path if needed

export default function StudentHome() {
  const [isAttending,  setIsAttending]  = useState<boolean | null>(true);
  const [portion,      setPortion]      = useState('Regular');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notifStatus,  setNotifStatus]  = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [notifBanner,  setNotifBanner]  = useState<string | null>(null);
  const navigate = useNavigate();

  // ── Register SW + check permission on mount ─────────────────────────────
  useEffect(() => {
    registerSW();

    if ('Notification' in window) {
      setNotifStatus(Notification.permission as 'unknown' | 'granted' | 'denied');
    }
  }, []);

  // ── Auto-hide banner ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!notifBanner) return;
    const t = setTimeout(() => setNotifBanner(null), 3500);
    return () => clearTimeout(t);
  }, [notifBanner]);

  // ── Request permission ───────────────────────────────────────────────────
  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotifStatus(granted ? 'granted' : 'denied');
    if (granted) {
      setNotifBanner('🔔 Notifications enabled!');
    } else {
      setNotifBanner('❌ Notifications blocked. Enable in browser settings.');
    }
  };

  // ── Generate QR + fire notification ─────────────────────────────────────
  const handleGenerateQR = async () => {
    // Ensure permission before firing
    if (notifStatus !== 'granted') {
      const granted = await requestNotificationPermission();
      setNotifStatus(granted ? 'granted' : 'denied');
      if (!granted) {
        setNotifBanner('⚠️ Allow notifications to get meal reminders.');
      }
    }

    // Send notification
    const portionLabel = isAttending ? portion : 'Skipped';
    const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', month: 'short', day: 'numeric',
    });

    await sendLocalNotification({
      title:   '🍽️ Meal QR Generated!',
      body:    `${formattedDate} · ${portionLabel} portion. Show this QR at the dining hall.`,
      icon:    '/favicon.ico',
      tag:     'meal-qr',
      url:     `/qrcode?date=${selectedDate}&attending=${isAttending}&portion=${portionLabel}`,
      actions: [
        { action: 'view', title: 'View QR' },
      ],
    });

    // Navigate to QR page
    const params = new URLSearchParams({
      date:      selectedDate,
      attending: String(isAttending),
      portion:   isAttending ? portion : 'None',
    });
    navigate(`/qrcode?${params.toString()}`);
  };

  const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short', month: 'long', day: 'numeric',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .shome-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f5f3ef;
          position: relative;
          overflow-x: hidden;
        }
        .shome-root::before {
          content: '';
          position: fixed; top: -120px; left: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .shome-root::after {
          content: '';
          position: fixed; bottom: -100px; right: -60px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, #fde68a 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobFloat 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(20px,30px) scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .shome-inner {
          position: relative; z-index: 1;
          padding: 28px 20px 100px;
          max-width: 480px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 16px;
        }

        /* ── Notification banner ── */
        .notif-banner {
          position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
          z-index: 999; min-width: 280px; max-width: 90vw;
          background: #111827; color: #fff;
          padding: 12px 18px; border-radius: 14px;
          font-size: 0.82rem; font-weight: 600;
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
          animation: slideDown 0.35s ease, fadeOut 0.4s ease 3.1s forwards;
          text-align: center;
        }
        @keyframes slideDown {
          from { opacity:0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity:0; transform: translateX(-50%) translateY(-8px); }
        }

        /* ── Notification enable strip ── */
        .notif-strip {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          background: #fff; border-radius: 16px; padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          box-shadow: 0 3px 12px rgba(0,0,0,0.05);
          animation: fadeUp 0.4s ease both 0.05s;
        }
        .notif-strip-left { display:flex; align-items:center; gap:10px; }
        .notif-strip-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .notif-strip-title { font-size:0.82rem; font-weight:700; color:#374151; }
        .notif-strip-sub   { font-size:0.7rem; color:#9ca3af; }
        .notif-enable-btn {
          padding: 7px 14px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #15803d, #22c55e);
          color: #fff; font-family:'DM Sans',sans-serif;
          font-size: 0.75rem; font-weight:700; cursor:pointer;
          box-shadow: 0 3px 10px rgba(22,163,74,0.28);
          white-space: nowrap; flex-shrink:0;
          transition: all 0.18s;
        }
        .notif-enable-btn:hover { transform:translateY(-1px); box-shadow:0 5px 14px rgba(22,163,74,0.35); }
        .notif-granted {
          font-size:0.72rem; font-weight:600; color:#15803d;
          background:#f0fdf4; border:1px solid #bbf7d0;
          border-radius:999px; padding:4px 10px; white-space:nowrap;
        }
        .notif-denied {
          font-size:0.72rem; color:#ef4444; font-weight:500;
        }

        /* ── Header ── */
        .shome-header { animation: fadeUp 0.4s ease both 0.08s; }
        .shome-header h2 {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; line-height: 1.15; color: #14532d; margin: 0 0 4px;
        }
        .shome-header h2 em { font-style:italic; color:#16a34a; }
        .shome-header p { font-size:0.85rem; color:#6b7280; margin:0; }

        /* ── Warrior card ── */
        .warrior-card {
          background: linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%);
          border-radius: 20px; padding: 20px 22px;
          position: relative; overflow: hidden;
          box-shadow: 0 8px 32px rgba(20,83,45,0.28);
          animation: fadeUp 0.45s ease both 0.14s;
        }
        .warrior-card::before {
          content:'🌿'; position:absolute; right:-8px; top:-12px;
          font-size:6rem; opacity:0.12; transform:rotate(-20deg); pointer-events:none;
        }
        .warrior-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2);
          border-radius:999px; padding:4px 12px;
          font-size:0.72rem; font-weight:600; color:#bbf7d0;
          letter-spacing:0.06em; text-transform:uppercase; margin-bottom:10px;
        }
        .warrior-card h3 {
          font-family:'Instrument Serif',serif;
          font-size:1.5rem; color:#fff; margin:0 0 4px;
        }
        .warrior-card p { font-size:0.78rem; color:rgba(255,255,255,0.6); margin:0 0 14px; }
        .warrior-bar-track {
          background:rgba(0,0,0,0.2); border-radius:999px; height:6px; overflow:hidden;
        }
        .warrior-bar-fill {
          background:linear-gradient(90deg,#86efac,#fff);
          height:100%; border-radius:999px; width:0%;
        }

        /* ── Meal card ── */
        .meal-card {
          background:#fff; border-radius:24px; padding:24px;
          box-shadow:0 4px 24px rgba(0,0,0,0.06);
          border:1px solid rgba(0,0,0,0.05);
          animation: fadeUp 0.45s ease both 0.2s;
        }
        .meal-card-top {
          display:flex; justify-content:space-between; align-items:flex-start;
          margin-bottom:18px; gap:12px;
        }
        .meal-tag {
          display:inline-block; font-size:0.65rem; font-weight:700;
          letter-spacing:0.1em; text-transform:uppercase;
          color:#15803d; background:#dcfce7;
          padding:3px 10px; border-radius:999px; margin-bottom:8px;
        }
        .meal-card-top h3 {
          font-family:'Instrument Serif',serif;
          font-size:1.35rem; color:#111827; margin:0 0 4px;
        }
        .meal-card-top p { font-size:0.78rem; color:#9ca3af; margin:0; }
        .date-pill {
          display:flex; align-items:center; gap:8px;
          background:#f9fafb; border:1.5px solid #e5e7eb;
          border-radius:14px; padding:8px 12px; cursor:pointer;
          transition:border-color 0.2s, box-shadow 0.2s; white-space:nowrap;
        }
        .date-pill:focus-within {
          border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.12);
        }
        .date-pill input[type="date"] {
          border:none; background:transparent; font-size:0.78rem;
          font-family:'DM Sans',sans-serif; font-weight:600; color:#111827;
          outline:none; width:110px; cursor:pointer;
        }
        .date-info {
          background:linear-gradient(135deg,#f0fdf4,#fafff7);
          border:1px solid #bbf7d0; border-radius:14px;
          padding:12px 16px; margin-bottom:20px;
          display:flex; align-items:center; gap:10px;
        }
        .date-info-icon {
          width:36px; height:36px; background:#dcfce7;
          border-radius:10px; display:flex; align-items:center;
          justify-content:center; font-size:1.1rem; flex-shrink:0;
        }
        .date-info strong { display:block; font-size:0.88rem; font-weight:700; color:#14532d; }
        .date-info span   { font-size:0.72rem; color:#6b7280; }

        .section-label { font-size:0.78rem; font-weight:600; color:#374151; margin:0 0 10px; }
        .toggle-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
        .toggle-btn {
          display:flex; align-items:center; justify-content:center; gap:7px;
          padding:12px; border-radius:14px; border:1.5px solid #e5e7eb;
          background:#fff; font-size:0.82rem; font-family:'DM Sans',sans-serif;
          font-weight:600; color:#6b7280; cursor:pointer; transition:all 0.18s;
        }
        .toggle-btn:hover { border-color:#9ca3af; }
        .toggle-btn.yes-active {
          background:linear-gradient(135deg,#f0fdf4,#dcfce7);
          border-color:#16a34a; color:#14532d;
          box-shadow:0 0 0 3px rgba(22,163,74,0.1);
        }
        .toggle-btn.no-active {
          background:linear-gradient(135deg,#fff5f5,#fee2e2);
          border-color:#ef4444; color:#991b1b;
          box-shadow:0 0 0 3px rgba(239,68,68,0.1);
        }
        .section-divider {
          height:1px;
          background:linear-gradient(90deg,transparent,#e5e7eb,transparent);
          margin:4px 0 18px;
        }
        .portion-wrap { position:relative; }
        .portion-select {
          width:100%; appearance:none;
          background:#f9fafb; border:1.5px solid #e5e7eb;
          border-radius:14px; padding:12px 40px 12px 16px;
          font-size:0.85rem; font-family:'DM Sans',sans-serif;
          font-weight:500; color:#111827; outline:none; cursor:pointer;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .portion-select:focus {
          border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.12);
        }
        .portion-chevron {
          position:absolute; right:14px; top:50%;
          transform:translateY(-50%); pointer-events:none; color:#9ca3af;
        }

        /* ── QR Button ── */
        .qr-btn-wrap {
          margin-top:20px; padding-top:20px; border-top:1px dashed #e5e7eb;
        }
        .qr-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:9px;
          padding:15px; border-radius:16px; border:none;
          background:linear-gradient(135deg,#15803d 0%,#16a34a 50%,#22c55e 100%);
          color:#fff; font-family:'DM Sans',sans-serif;
          font-size:0.92rem; font-weight:700; cursor:pointer;
          letter-spacing:0.02em;
          box-shadow:0 6px 20px rgba(22,163,74,0.35);
          transition:all 0.2s; position:relative; overflow:hidden;
        }
        .qr-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .qr-btn:hover {
          transform:translateY(-2px);
          box-shadow:0 10px 28px rgba(22,163,74,0.4);
        }
        .qr-btn:active { transform:scale(0.98); }
        .qr-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .qr-btn-hint {
          text-align:center; font-size:0.72rem; color:#9ca3af; margin-top:8px;
        }
        @keyframes pulse-icon {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.7; transform:scale(0.92); }
        }
        .qr-btn svg { animation:pulse-icon 2.4s ease-in-out infinite; }
      `}</style>

      {/* Toast banner */}
      {notifBanner && (
        <div className="notif-banner">{notifBanner}</div>
      )}

      <div className="shome-root">
        <div className="shome-inner">

          {/* Notification enable strip */}
          <div className="notif-strip">
            <div className="notif-strip-left">
              <div className="notif-strip-icon"
                style={{ background: notifStatus === 'granted' ? '#dcfce7' : notifStatus === 'denied' ? '#fef2f2' : '#f3f4f6',
                         color:      notifStatus === 'granted' ? '#15803d' : notifStatus === 'denied' ? '#ef4444' : '#6b7280' }}>
                {notifStatus === 'denied' ? <BellOff size={17} /> : <Bell size={17} />}
              </div>
              <div>
                <p className="notif-strip-title">Meal Notifications</p>
                <p className="notif-strip-sub">
                  {notifStatus === 'granted' ? 'You will be notified when QR is generated'
                   : notifStatus === 'denied' ? 'Blocked in browser settings'
                   : 'Get alerts when your QR is ready'}
                </p>
              </div>
            </div>
            {notifStatus === 'granted' ? (
              <span className="notif-granted">✓ Enabled</span>
            ) : notifStatus === 'denied' ? (
              <span className="notif-denied">Blocked</span>
            ) : (
              <button className="notif-enable-btn" onClick={handleEnableNotifications}>
                Enable
              </button>
            )}
          </div>

          {/* Header */}
          <header className="shome-header">
            <h2>Welcome <em>back</em> 👋</h2>
            <p>Reserve your meal below — takes just a second.</p>
          </header>

          {/* Warrior card */}
          <div className="warrior-card">
            <div className="warrior-badge"><Leaf size={11} /> Achievement</div>
            <h3>Waste Warrior</h3>
            <p>Keep marking meals to climb the leaderboard</p>
            <div className="warrior-bar-track">
              <div className="warrior-bar-fill" />
            </div>
          </div>

          {/* Meal card */}
          <div className="meal-card">
            <div className="meal-card-top">
              <div>
                <span className="meal-tag">Upcoming Meal</span>
                <h3>Reserve Your Meal</h3>
                <p>Pick the date &amp; set your preference</p>
              </div>
              <label className="date-pill">
                <Calendar size={15} color="#16a34a" />
                <input type="date" value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  aria-label="Select meal date" />
              </label>
            </div>

            <div className="date-info">
              <div className="date-info-icon">🗓️</div>
              <div>
                <strong>{formattedDate}</strong>
                <span>Your reservation will be saved for this date</span>
              </div>
            </div>

            <p className="section-label">Are you eating today?</p>
            <div className="toggle-grid">
              <button onClick={() => setIsAttending(true)}
                className={`toggle-btn ${isAttending === true ? 'yes-active' : ''}`}>
                <CheckCircle2 size={17} /> Yes, I am
              </button>
              <button onClick={() => setIsAttending(false)}
                className={`toggle-btn ${isAttending === false ? 'no-active' : ''}`}>
                <XCircle size={17} /> Skipping
              </button>
            </div>

            {isAttending && (
              <>
                <div className="section-divider" />
                <p className="section-label">Portion Size</p>
                <div className="portion-wrap">
                  <select value={portion} onChange={(e) => setPortion(e.target.value)}
                    className="portion-select">
                    <option value="Small">🥗 Small Portion</option>
                    <option value="Regular">🍽️ Regular Portion</option>
                    <option value="Large">🫕 Large Portion</option>
                  </select>
                  <ChevronDown size={17} className="portion-chevron" />
                </div>
              </>
            )}

            <div className="qr-btn-wrap">
              <button onClick={handleGenerateQR} disabled={isAttending === null} className="qr-btn">
                <QrCode size={20} />
                Generate Meal QR Code
                <Sparkles size={15} style={{ opacity: 0.8 }} />
              </button>
              <p className="qr-btn-hint">
                {notifStatus === 'granted'
                  ? '🔔 You will get a notification when QR is ready'
                  : 'Show this QR at the dining hall to confirm your meal'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}