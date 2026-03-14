// import { User, Sparkles, Star } from 'lucide-react';

// export default function Profile() {
//   return (
//     <div className="space-y-6 pb-28">
//       <header className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-surface-900">Profile</h2>
//           <p className="text-surface-500 text-sm">Your settings and progress</p>
//         </div>
//         <div className="bg-primary-600 text-white rounded-full p-3">
//           <User size={20} />
//         </div>
//       </header>

//       <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm">
//         <div className="flex items-center gap-4">
//           <div className="h-14 w-14 rounded-full bg-surface-100 flex items-center justify-center">
//             <User className="text-surface-500" size={28} />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-surface-900">Your Name</h3>
//             <p className="text-surface-500 text-sm">Member since • —</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-6">
//           <div className="rounded-2xl bg-primary-50 border border-primary-100 p-4">
//             <div className="flex items-center gap-2 text-primary-700">
//               <Sparkles size={18} />
//               <span className="text-sm font-semibold">Badges</span>
//             </div>
//             <p className="text-xs text-primary-600 mt-2">No badges earned yet.</p>
//           </div>

//           <div className="rounded-2xl bg-surface-50 border border-surface-200 p-4">
//             <div className="flex items-center gap-2 text-surface-700">
//               <Star size={18} />
//               <span className="text-sm font-semibold">Engagement</span>
//             </div>
//             <p className="text-xs text-surface-500 mt-2">No actions recorded yet.</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm">
//         <h3 className="text-sm font-semibold text-surface-900 mb-3">Settings</h3>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between text-sm text-surface-700">
//             <span>Notifications</span>
//             <span className="text-surface-400">—</span>
//           </div>
//           <div className="flex items-center justify-between text-sm text-surface-700">
//             <span>Language</span>
//             <span className="text-surface-400">—</span>
//           </div>
//           <div className="flex items-center justify-between text-sm text-surface-700">
//             <span>Theme</span>
//             <span className="text-surface-400">—</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { User, Sparkles, Star, Bell, Globe, Sun, Moon, LogOut, Leaf, ShieldCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, signOut } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [language,      setLanguage]      = useState('English');
  const [darkMode,      setDarkMode]      = useState(false);
  const [signingOut,    setSigningOut]    = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  const initials = user?.name
    ? user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
    : (user?.email?.[0]?.toUpperCase() ?? '?');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .prof-root {
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 100px;
          position: relative;
          overflow-x: hidden;
        }
        .prof-root::before {
          content: '';
          position: fixed; top: -100px; right: -80px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, #bbf7d0 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobDrift 10s ease-in-out infinite alternate;
        }
        .prof-root::after {
          content: '';
          position: fixed; bottom: -80px; left: -60px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, #fde68a 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none;
          animation: blobDrift 13s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(20px,28px) scale(1.09); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .prof-hdr {
          position: relative; z-index: 1;
          margin-bottom: 22px;
          animation: fadeUp 0.4s ease both;
        }
        .prof-hdr h2 {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; color: #111827;
          margin: 0 0 3px; line-height: 1.15;
        }
        .prof-hdr h2 em { font-style: italic; color: #16a34a; }
        .prof-hdr p { font-size: 0.82rem; color: #6b7280; margin: 0; }

        /* Hero card */
        .hero-card {
          position: relative; z-index: 1;
          background: linear-gradient(135deg, #14532d 0%, #166534 45%, #15803d 100%);
          border-radius: 24px; padding: 22px;
          box-shadow: 0 8px 32px rgba(20,83,45,0.28);
          overflow: hidden; margin-bottom: 14px;
          animation: fadeUp 0.45s ease both 0.07s;
        }
        .hero-card::before {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }
        .hero-card::after {
          content: '🌿';
          position: absolute; bottom: -18px; right: 8px;
          font-size: 5rem; opacity: 0.1;
          transform: rotate(-15deg); pointer-events: none;
        }
        .hero-top {
          display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
        }
        .avatar {
          width: 58px; height: 58px; border-radius: 17px;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Instrument Serif', serif;
          font-size: 1.35rem; color: #fff; flex-shrink: 0;
        }
        .hero-name {
          font-family: 'Instrument Serif', serif;
          font-size: 1.35rem; color: #fff; margin: 0 0 3px; line-height: 1.2;
        }
        .hero-email { font-size: 0.73rem; color: rgba(255,255,255,0.58); margin: 0 0 7px; }
        .role-badge {
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px; padding: 3px 10px;
          font-size: 0.67rem; font-weight: 700; color: #bbf7d0;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .hero-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .hero-stat {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 13px; padding: 10px 8px; text-align: center;
        }
        .hstat-val {
          font-size: 1.15rem; font-weight: 800; color: #fff;
          display: block; line-height: 1;
        }
        .hstat-lbl {
          font-size: 0.63rem; color: rgba(255,255,255,0.5);
          display: block; margin-top: 3px;
        }

        /* Two-col */
        .two-col {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 14px;
          position: relative; z-index: 1;
          animation: fadeUp 0.45s ease both 0.13s;
        }
        .mini-card {
          background: #fff; border-radius: 18px; padding: 15px;
          border: 1px solid #f3f4f6;
          box-shadow: 0 3px 14px rgba(0,0,0,0.05);
        }
        .mini-head {
          display: flex; align-items: center; gap: 7px; margin-bottom: 9px;
        }
        .mini-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .mini-icon.green { background: #dcfce7; color: #15803d; }
        .mini-icon.amber { background: #fef3c7; color: #92400e; }
        .mini-head span { font-size: 0.78rem; font-weight: 700; color: #374151; }
        .mini-card p { font-size: 0.7rem; color: #9ca3af; margin: 0; line-height: 1.45; }

        /* Settings */
        .settings-card {
          background: #fff; border-radius: 22px; overflow: hidden;
          border: 1px solid #f3f4f6;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          margin-bottom: 14px; position: relative; z-index: 1;
          animation: fadeUp 0.45s ease both 0.19s;
        }
        .settings-hdr {
          padding: 14px 18px 11px; border-bottom: 1px solid #f3f4f6;
          font-size: 0.72rem; font-weight: 700; color: #9ca3af;
          letter-spacing: 0.07em; text-transform: uppercase;
        }
        .srow {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 18px; border-bottom: 1px solid #f9fafb;
          cursor: pointer; transition: background 0.15s;
        }
        .srow:last-child { border-bottom: none; }
        .srow:hover { background: #f9fafb; }
        .srow-icon {
          width: 33px; height: 33px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .srow-text { flex: 1; }
        .srow-title { font-size: 0.84rem; font-weight: 600; color: #374151; }
        .srow-desc  { font-size: 0.7rem; color: #9ca3af; margin-top: 1px; }

        /* Toggle */
        .tog {
          width: 38px; height: 21px; border-radius: 999px;
          background: #e5e7eb; position: relative;
          flex-shrink: 0; border: none; padding: 0; cursor: pointer;
          transition: background 0.22s;
        }
        .tog.on { background: #16a34a; }
        .tog-thumb {
          position: absolute; top: 2.5px; left: 2.5px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          transition: transform 0.22s;
        }
        .tog.on .tog-thumb { transform: translateX(17px); }

        .lang-sel {
          border: none; background: transparent; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
          font-weight: 600; color: #6b7280; cursor: pointer;
        }

        /* Sign out */
        .signout-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 8px;
          padding: 13px; border-radius: 16px;
          background: #fff; color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          border: 1.5px solid #fecaca;
          box-shadow: 0 4px 14px rgba(239,68,68,0.07);
          transition: all 0.2s;
          position: relative; z-index: 1;
          animation: fadeUp 0.45s ease both 0.25s;
        }
        .signout-btn:hover {
          background: #fef2f2; border-color: #ef4444;
          box-shadow: 0 6px 20px rgba(239,68,68,0.13);
          transform: translateY(-1px);
        }
        .signout-btn:active { transform: scale(0.98); }
        .signout-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .prof-footer {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 0.7rem; color: #9ca3af; margin-top: 14px;
          position: relative; z-index: 1;
          animation: fadeUp 0.45s ease both 0.3s;
        }
      `}</style>

      <div className="prof-root">

        <header className="prof-hdr">
          <h2>My <em>Profile</em></h2>
          <p>Your settings and progress</p>
        </header>

        {/* Hero card */}
        <div className="hero-card">
          <div className="hero-top">
            <div className="avatar">{initials}</div>
            <div>
              <p className="hero-name">{user?.name || 'User'}</p>
              <p className="hero-email">{user?.email || 'No email available'}</p>
              <span className="role-badge">
                <ShieldCheck size={10} />
{((user)?.role) || 'student'}
              </span>
            </div>
          </div>
          <div className="hero-stats">
            {[['0','Meals Saved'],['0','Badges'],['0%','Attendance']].map(([v,l]) => (
              <div key={l} className="hero-stat">
                <span className="hstat-val">{v}</span>
                <span className="hstat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges + Engagement */}
        <div className="two-col">
          <div className="mini-card">
            <div className="mini-head">
              <div className="mini-icon green"><Sparkles size={14} /></div>
              <span>Badges</span>
            </div>
            <p>No badges earned yet. Start marking meals!</p>
          </div>
          <div className="mini-card">
            <div className="mini-head">
              <div className="mini-icon amber"><Star size={14} /></div>
              <span>Engagement</span>
            </div>
            <p>No actions recorded yet.</p>
          </div>
        </div>

        {/* Settings */}
        <div className="settings-card">
          <div className="settings-hdr">Settings</div>

          <div className="srow" onClick={() => setNotifications(n => !n)}>
            <div className="srow-icon" style={{ background:'#eff6ff', color:'#3b82f6' }}>
              <Bell size={15} />
            </div>
            <div className="srow-text">
              <p className="srow-title">Notifications</p>
              <p className="srow-desc">{notifications ? 'Meal reminders enabled' : 'All notifications off'}</p>
            </div>
            <button className={`tog ${notifications ? 'on' : ''}`}
              onClick={e => { e.stopPropagation(); setNotifications(n => !n); }}>
              <div className="tog-thumb" />
            </button>
          </div>

          <div className="srow" style={{ cursor:'default' }}>
            <div className="srow-icon" style={{ background:'#fdf4ff', color:'#a855f7' }}>
              <Globe size={15} />
            </div>
            <div className="srow-text">
              <p className="srow-title">Language</p>
              <p className="srow-desc">App display language</p>
            </div>
            <select className="lang-sel" value={language}
              onChange={e => setLanguage(e.target.value)}
              onClick={e => e.stopPropagation()}>
              <option>English</option>
              <option>Hindi</option>
              <option>Punjabi</option>
            </select>
          </div>

          <div className="srow" onClick={() => setDarkMode(d => !d)}>
            <div className="srow-icon"
              style={{ background: darkMode ? '#1f2937':'#f9fafb', color: darkMode ? '#fbbf24':'#374151' }}>
              {darkMode ? <Moon size={15} /> : <Sun size={15} />}
            </div>
            <div className="srow-text">
              <p className="srow-title">Theme</p>
              <p className="srow-desc">{darkMode ? 'Dark mode' : 'Light mode'}</p>
            </div>
            <button className={`tog ${darkMode ? 'on' : ''}`}
              style={darkMode ? { background:'#4b5563' } : {}}
              onClick={e => { e.stopPropagation(); setDarkMode(d => !d); }}>
              <div className="tog-thumb" />
            </button>
          </div>

          <div className="srow" style={{ cursor:'default' }}>
            <div className="srow-icon" style={{ background:'#dcfce7', color:'#15803d' }}>
              <Leaf size={15} />
            </div>
            <div className="srow-text">
              <p className="srow-title">Eco Impact</p>
              <p className="srow-desc">0 kg food saved so far</p>
            </div>
            <ChevronRight size={15} color="#d1d5db" />
          </div>
        </div>

        <button onClick={handleSignOut} disabled={signingOut} className="signout-btn">
          <LogOut size={17} />
          {signingOut ? 'Signing out…' : 'Sign Out'}
        </button>

        <p className="prof-footer">
          <Leaf size={10} color="#16a34a" /> Hostel Food Saver · v1.0
        </p>
      </div>
    </>
  );
}