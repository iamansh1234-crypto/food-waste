// import { TrendingDown, Users, Utensils, IndianRupee, PieChart, Activity, Flame } from 'lucide-react';

// export default function AdminDashboard() {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         .adm-root {
//           font-family: 'DM Sans', sans-serif;
//           padding-bottom: 100px;
//         }
//         .adm-header {
//           display: flex; align-items: center; justify-content: space-between;
//           margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
//         }
//         .adm-header h2 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 1.9rem; color: #111827; margin: 0 0 3px; line-height: 1.15;
//         }
//         .adm-header h2 em { font-style: italic; color: #16a34a; }
//         .adm-header p { font-size: 0.8rem; color: #6b7280; margin: 0; }
//         .live-badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: linear-gradient(135deg, #111827, #1f2937);
//           color: #fff; padding: 7px 14px; border-radius: 12px;
//           font-size: 0.78rem; font-weight: 700;
//           box-shadow: 0 4px 14px rgba(0,0,0,0.18);
//         }
//         .live-dot {
//           width: 7px; height: 7px; border-radius: 50%;
//           background: #22c55e;
//           animation: livePulse 1.4s ease-in-out infinite;
//           box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
//         }
//         @keyframes livePulse {
//           0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
//           70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
//           100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
//         }

//         /* ── Stat cards ── */
//         .stat-grid {
//           display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
//           margin-bottom: 20px;
//         }
//         .stat-card {
//           background: #fff; border-radius: 20px;
//           padding: 18px; border: 1px solid #f3f4f6;
//           box-shadow: 0 4px 16px rgba(0,0,0,0.05);
//           position: relative; overflow: hidden;
//           animation: fadeUp 0.4s ease both;
//         }
//         .stat-card:nth-child(2) { animation-delay: 0.08s; }
//         @keyframes fadeUp {
//           from { opacity:0; transform:translateY(16px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .stat-card::after {
//           content: ''; position: absolute;
//           bottom: -20px; right: -20px;
//           width: 80px; height: 80px; border-radius: 50%;
//           opacity: 0.06; pointer-events: none;
//         }
//         .stat-card.waste::after { background: #ef4444; }
//         .stat-card.value::after { background: #6366f1; }
//         .stat-icon {
//           width: 38px; height: 38px; border-radius: 12px;
//           display: flex; align-items: center; justify-content: center;
//           margin-bottom: 12px;
//         }
//         .stat-icon.red   { background: #fef2f2; color: #ef4444; }
//         .stat-icon.indigo { background: #eef2ff; color: #6366f1; }
//         .stat-label { font-size: 0.75rem; color: #6b7280; font-weight: 500; margin: 0 0 4px; }
//         .stat-val {
//           font-size: 1.7rem; font-weight: 800; color: #111827;
//           font-variant-numeric: tabular-nums; margin: 0 0 8px;
//           font-family: 'DM Sans', sans-serif; line-height: 1;
//         }
//         .stat-val span { font-size: 0.9rem; font-weight: 500; color: #9ca3af; }
//         .stat-pill {
//           display: inline-flex; align-items: center; gap: 4px;
//           font-size: 0.68rem; font-weight: 700;
//           background: #f0fdf4; color: #15803d;
//           padding: 3px 8px; border-radius: 999px;
//         }

//         /* ── Waste sources card ── */
//         .section-card {
//           background: #fff; border-radius: 22px;
//           padding: 20px; border: 1px solid #f3f4f6;
//           box-shadow: 0 4px 16px rgba(0,0,0,0.05);
//           margin-bottom: 16px;
//           animation: fadeUp 0.5s ease both 0.1s;
//         }
//         .section-card h3 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 1.15rem; color: #111827;
//           margin: 0 0 16px; display: flex; align-items: center; gap: 8px;
//           padding-bottom: 12px; border-bottom: 1px solid #f3f4f6;
//         }
//         .waste-item { margin-bottom: 16px; }
//         .waste-item:last-child { margin-bottom: 0; }
//         .waste-row {
//           display: flex; justify-content: space-between; align-items: center;
//           margin-bottom: 6px;
//         }
//         .waste-name { font-size: 0.85rem; font-weight: 600; color: #374151; }
//         .waste-amount { font-size: 0.82rem; font-weight: 700; }
//         .bar-track {
//           width: 100%; background: #f3f4f6; border-radius: 999px; height: 8px; overflow: hidden;
//         }
//         .bar-fill {
//           height: 100%; border-radius: 999px;
//           transition: width 0.8s ease;
//         }
//         .waste-note { font-size: 0.7rem; color: #9ca3af; margin-top: 5px; }

//         /* ── Empty placeholder shimmer ── */
//         .shimmer {
//           display: inline-block; min-width: 80px; height: 1em;
//           background: linear-gradient(90deg, #f3f4f6 25%, #e9ecef 50%, #f3f4f6 75%);
//           background-size: 200% 100%;
//           border-radius: 6px; animation: shimmer 1.6s infinite;
//           vertical-align: middle;
//         }
//         @keyframes shimmer {
//           from { background-position: 200% 0; }
//           to   { background-position: -200% 0; }
//         }

//         /* ── Engagement card (dark) ── */
//         .engage-card {
//           background: linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%);
//           border-radius: 22px; padding: 20px;
//           box-shadow: 0 8px 28px rgba(20,83,45,0.25);
//           position: relative; overflow: hidden;
//           animation: fadeUp 0.5s ease both 0.18s;
//         }
//         .engage-card::before {
//           content: ''; position: absolute;
//           top: -40px; right: -40px;
//           width: 180px; height: 180px; border-radius: 50%;
//           background: rgba(255,255,255,0.06); pointer-events: none;
//         }
//         .engage-card h3 {
//           font-family: 'Instrument Serif', serif;
//           font-size: 1.15rem; color: #fff;
//           margin: 0 0 16px; display: flex; align-items: center; gap: 8px;
//           padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.12);
//         }
//         .engage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//         .engage-item {}
//         .engage-label { font-size: 0.75rem; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
//         .engage-val {
//           font-size: 1.8rem; font-weight: 800; color: #fff;
//           line-height: 1; margin-bottom: 5px;
//           font-variant-numeric: tabular-nums;
//         }
//         .engage-note {
//           font-size: 0.7rem; display: inline-flex; align-items: center; gap: 3px;
//           background: rgba(255,255,255,0.12); border-radius: 999px;
//           padding: 2px 8px; color: rgba(255,255,255,0.65);
//         }
//       `}</style>

//       <div className="adm-root">
//         {/* Header */}
//         <header className="adm-header">
//           <div>
//             <h2>Admin <em>Overview</em></h2>
//             <p>Real-time food waste & engagement data</p>
//           </div>
//           <div className="live-badge">
//             <span className="live-dot" />
//             <Activity size={13} /> Live Data
//           </div>
//         </header>

//         {/* Stat cards */}
//         <div className="stat-grid">
//           <div className="stat-card waste">
//             <div className="stat-icon red"><PieChart size={18} /></div>
//             <p className="stat-label">Total Waste</p>
//             <p className="stat-val"><span className="shimmer" style={{width:60}} /></p>
//             <span className="stat-pill"><TrendingDown size={11} /> —</span>
//           </div>
//           <div className="stat-card value">
//             <div className="stat-icon indigo"><IndianRupee size={18} /></div>
//             <p className="stat-label">Value Lost</p>
//             <p className="stat-val"><span className="shimmer" style={{width:70}} /></p>
//             <span className="stat-pill"><TrendingDown size={11} /> —</span>
//           </div>
//         </div>

//         {/* Highest Waste Dishes
//         <div className="section-card">
//           <h3>
//             <Flame size={18} color="#ef4444" /> Highest Waste Dishes
//           </h3>
//           <div className="waste-item">
//             <div className="waste-row">
//               <span className="waste-name"><span className="shimmer" style={{width:90}} /></span>
//               <span className="waste-amount" style={{color:'#ef4444'}}>
//                 <span className="shimmer" style={{width:40}} />
//               </span>
//             </div>
//             <div className="bar-track">
//               <div className="bar-fill" style={{background:'#ef4444', width:'0%'}} />
//             </div>
//             <p className="waste-note"><span className="shimmer" style={{width:120}} /></p>
//           </div>
//           <div className="waste-item">
//             <div className="waste-row">
//               <span className="waste-name"><span className="shimmer" style={{width:80}} /></span>
//               <span className="waste-amount" style={{color:'#f59e0b'}}>
//                 <span className="shimmer" style={{width:40}} />
//               </span>
//             </div>
//             <div className="bar-track">
//               <div className="bar-fill" style={{background:'#f59e0b', width:'0%'}} />
//             </div>
//             <p className="waste-note"><span className="shimmer" style={{width:100}} /></p>
//           </div>
//         </div> */}

//         {/* Highest Waste Dishes */}
// <div className="section-card">
//   <h3>
//     <Flame size={18} color="#ef4444" /> Highest Waste Dishes
//     <span style={{ marginLeft:'auto', fontSize:'0.68rem', fontWeight:500,
//       color:'#6b7280', background:'#f3f4f6', padding:'3px 10px',
//       borderRadius:999, border:'1px solid #e5e7eb' }}>
//       This week
//     </span>
//   </h3>

//   {/* Summary metric cards */}
//   <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:20 }}>
//     {[['Total Wasted','47.2 kg'],['Value Lost','₹2,840'],['Worst Day','Thursday']].map(([l,v]) => (
//       <div key={l} style={{ background:'#f9fafb', borderRadius:10, padding:'10px 12px' }}>
//         <p style={{ fontSize:'0.68rem', color:'#6b7280', margin:'0 0 3px' }}>{l}</p>
//         <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#111827', margin:0 }}>{v}</p>
//       </div>
//     ))}
//   </div>

//   {/* Legend */}
//   <div style={{ display:'flex', gap:14, marginBottom:10, flexWrap:'wrap' }}>
//     {[['#e24b4a','High (>8 kg)'],['#ef9f27','Medium (4–8 kg)'],['#97c459','Low (<4 kg)']].map(([c,l]) => (
//       <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.68rem', color:'#6b7280' }}>
//         <span style={{ width:9, height:9, borderRadius:2, background:c, display:'inline-block' }} />{l}
//       </span>
//     ))}
//   </div>

//   {/* Chart */}
//   <div style={{ position:'relative', width:'100%', height:280 }}>
//     <canvas id="wasteChart" />
//   </div>

//   {/* Detail rows */}
//   <div style={{ marginTop:16, borderTop:'1px solid #f3f4f6', paddingTop:14 }}>
//     <p style={{ fontSize:'0.72rem', color:'#9ca3af', fontWeight:600, margin:'0 0 10px', textTransform:'uppercase', letterSpacing:'0.06em' }}>
//       Dish detail
//     </p>
//     {[
//       { name:'Dal Makhani',   kg:12.4, note:'Overproduced Mon & Wed', color:'#e24b4a' },
//       { name:'Aloo Sabzi',    kg:9.8,  note:'Low preference at dinner', color:'#e24b4a' },
//       { name:'Paneer Butter', kg:7.1,  note:'Portion size too large',   color:'#ef9f27' },
//       { name:'Chapati',       kg:6.3,  note:'Excess baked on Fridays',  color:'#ef9f27' },
//       { name:'Rice (plain)',  kg:5.7,  note:'Dinner surplus',           color:'#ef9f27' },
//     ].map(d => (
//       <div key={d.name} style={{ display:'flex', alignItems:'center', gap:10,
//         padding:'9px 0', borderBottom:'1px solid #f9fafb' }}>
//         <div style={{ width:26, height:26, borderRadius:8, background:d.color+'22',
//           display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
//           <span style={{ width:7, height:7, borderRadius:'50%', background:d.color, display:'inline-block' }} />
//         </div>
//         <div style={{ flex:1, minWidth:0 }}>
//           <p style={{ fontSize:'0.82rem', fontWeight:600, color:'#374151', margin:0 }}>{d.name}</p>
//           <p style={{ fontSize:'0.7rem', color:'#9ca3af', margin:0 }}>{d.note}</p>
//         </div>
//         <p style={{ fontSize:'0.82rem', fontWeight:700, color:d.color, margin:0, flexShrink:0 }}>{d.kg} kg</p>
//       </div>
//     ))}
//   </div>
// </div>

//         {/* Student Engagement */}
//         <div className="engage-card">
//           <h3>
//             <Users size={18} color="rgba(255,255,255,0.6)" /> Student Engagement
//           </h3>
//           <div className="engage-grid">
//             <div className="engage-item">
//               <p className="engage-label">Pre-booking Rate</p>
//               <p className="engage-val">—</p>
//               <span className="engage-note"><Utensils size={10} /> No data yet</span>
//             </div>
//             <div className="engage-item">
//               <p className="engage-label">Avg Skipped / Day</p>
//               <p className="engage-val">—</p>
//               <span className="engage-note">No data yet</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { TrendingDown, Users, Utensils, IndianRupee, PieChart, Activity, Flame } from 'lucide-react';

const DISHES = [
  { name: 'Dal Makhani',    kg: 12.4, note: 'Overproduced Mon & Wed',   color: '#e24b4a', max: true  },
  { name: 'Aloo Sabzi',     kg: 9.8,  note: 'Low preference at dinner', color: '#e24b4a', max: false },
  { name: 'Paneer Butter',  kg: 7.1,  note: 'Portion size too large',   color: '#ef9f27', max: false },
  { name: 'Chapati',        kg: 6.3,  note: 'Excess baked on Fridays',  color: '#ef9f27', max: false },
  { name: 'Rice (plain)',   kg: 5.7,  note: 'Dinner surplus',           color: '#ef9f27', max: false },
  { name: 'Raita',          kg: 3.2,  note: 'Mostly unconsumed',        color: '#97c459', max: false },
  { name: 'Kheer',          kg: 2.7,  note: 'Popular only weekends',    color: '#97c459', max: false },
];

const MAX_KG = 12.4;

export default function AdminDashboard() {
  const [animated, setAnimated] = useState(false);

  // Trigger bar animation after mount
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .adm-root { font-family:'DM Sans',sans-serif; padding-bottom:100px; }

        /* header */
        .adm-header {
          display:flex; align-items:flex-start; justify-content:space-between;
          flex-wrap:wrap; gap:14px; margin-bottom:22px;
        }
        .adm-header h2 {
          font-family:'Instrument Serif',serif;
          font-size:1.9rem; color:#111827; margin:0 0 3px; line-height:1.15;
        }
        .adm-header h2 em { font-style:italic; color:#16a34a; }
        .adm-header p { font-size:0.8rem; color:#6b7280; margin:0; }
        .live-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:linear-gradient(135deg,#111827,#1f2937);
          color:#fff; padding:7px 14px; border-radius:12px;
          font-size:0.78rem; font-weight:700;
          box-shadow:0 4px 14px rgba(0,0,0,0.18);
        }
        .live-dot {
          width:7px; height:7px; border-radius:50%; background:#22c55e;
          animation:livePulse 1.4s ease-in-out infinite;
          box-shadow:0 0 0 0 rgba(34,197,94,0.5);
        }
        @keyframes livePulse {
          0%   { box-shadow:0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow:0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow:0 0 0 0 rgba(34,197,94,0); }
        }

        /* stat grid */
        .stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px; }
        .stat-card {
          background:#fff; border-radius:20px; padding:18px;
          border:1px solid #f3f4f6; box-shadow:0 4px 16px rgba(0,0,0,0.05);
          animation:fadeUp 0.4s ease both;
        }
        .stat-card:nth-child(2) { animation-delay:0.08s; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .stat-icon {
          width:38px; height:38px; border-radius:12px;
          display:flex; align-items:center; justify-content:center; margin-bottom:12px;
        }
        .stat-icon.red    { background:#fef2f2; color:#ef4444; }
        .stat-icon.indigo { background:#eef2ff; color:#6366f1; }
        .stat-label { font-size:0.75rem; color:#6b7280; margin:0 0 4px; }
        .stat-val {
          font-size:1.7rem; font-weight:800; color:#111827;
          font-variant-numeric:tabular-nums; margin:0 0 8px; line-height:1;
        }
        .stat-val span { font-size:0.9rem; font-weight:500; color:#9ca3af; }
        .stat-pill {
          display:inline-flex; align-items:center; gap:4px;
          font-size:0.68rem; font-weight:700;
          background:#f0fdf4; color:#15803d; padding:3px 8px; border-radius:999px;
        }

        /* section card */
        .section-card {
          background:#fff; border-radius:22px; padding:20px;
          border:1px solid #f3f4f6; box-shadow:0 4px 16px rgba(0,0,0,0.05);
          margin-bottom:16px; animation:fadeUp 0.5s ease both 0.1s;
        }
        .section-card h3 {
          font-family:'Instrument Serif',serif;
          font-size:1.15rem; color:#111827; margin:0 0 16px;
          display:flex; align-items:center; gap:8px;
          padding-bottom:12px; border-bottom:1px solid #f3f4f6;
        }
        .section-card h3 .week-tag {
          margin-left:auto; font-family:'DM Sans',sans-serif;
          font-size:0.68rem; font-weight:600; color:#6b7280;
          background:#f3f4f6; border:1px solid #e5e7eb;
          border-radius:999px; padding:3px 10px;
        }

        /* ── metric row ── */
        .metric-row {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:8px; margin-bottom:18px;
        }
        .metric-mini {
          background:#f9fafb; border-radius:12px; padding:10px 12px;
        }
        .metric-mini-label { font-size:0.68rem; color:#9ca3af; margin:0 0 3px; }
        .metric-mini-val   { font-size:1rem; font-weight:700; color:#111827; margin:0; }

        /* ── legend ── */
        .legend-row {
          display:flex; gap:14px; margin-bottom:14px; flex-wrap:wrap;
        }
        .legend-item {
          display:flex; align-items:center; gap:5px;
          font-size:0.68rem; color:#6b7280;
        }
        .legend-dot {
          width:9px; height:9px; border-radius:2px; flex-shrink:0;
        }

        /* ── Horizontal bar chart ── */
        .bar-chart { display:flex; flex-direction:column; gap:10px; }

        .bar-row { display:flex; align-items:center; gap:10px; }
        .bar-label {
          width:110px; font-size:0.75rem; font-weight:600;
          color:#374151; text-align:right; flex-shrink:0;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }
        .bar-track-outer {
          flex:1; background:#f3f4f6; border-radius:999px; height:20px;
          overflow:hidden; position:relative;
        }
        .bar-fill-inner {
          height:100%; border-radius:999px;
          transition:width 0.9s cubic-bezier(0.34,1.56,0.64,1);
          display:flex; align-items:center; justify-content:flex-end;
          padding-right:8px;
        }
        .bar-fill-inner span {
          font-size:0.65rem; font-weight:700; color:#fff;
          white-space:nowrap; opacity:0.92;
        }

        /* ── Detail rows ── */
        .detail-section {
          margin-top:18px; border-top:1px solid #f3f4f6; padding-top:14px;
        }
        .detail-section-title {
          font-size:0.68rem; font-weight:700; color:#9ca3af;
          text-transform:uppercase; letter-spacing:0.07em; margin:0 0 10px;
        }
        .detail-row {
          display:flex; align-items:center; gap:10px;
          padding:9px 0; border-bottom:1px solid #f9fafb;
        }
        .detail-row:last-child { border-bottom:none; }
        .detail-dot-wrap {
          width:28px; height:28px; border-radius:8px;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .detail-dot {
          width:8px; height:8px; border-radius:50%;
        }
        .detail-name { font-size:0.82rem; font-weight:600; color:#374151; margin:0; }
        .detail-note { font-size:0.7rem; color:#9ca3af; margin:0; }
        .detail-kg   { font-size:0.82rem; font-weight:700; margin:0; flex-shrink:0; }

        /* engagement */
        .engage-card {
          background:linear-gradient(135deg,#14532d 0%,#166534 50%,#15803d 100%);
          border-radius:22px; padding:20px;
          box-shadow:0 8px 28px rgba(20,83,45,0.25);
          position:relative; overflow:hidden;
          animation:fadeUp 0.5s ease both 0.18s;
        }
        .engage-card::before {
          content:''; position:absolute; top:-40px; right:-40px;
          width:180px; height:180px; border-radius:50%;
          background:rgba(255,255,255,0.06); pointer-events:none;
        }
        .engage-card h3 {
          font-family:'Instrument Serif',serif;
          font-size:1.15rem; color:#fff; margin:0 0 16px;
          display:flex; align-items:center; gap:8px;
          padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.12);
        }
        .engage-grid  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .engage-label { font-size:0.75rem; color:rgba(255,255,255,0.55); margin-bottom:4px; }
        .engage-val   { font-size:1.8rem; font-weight:800; color:#fff; line-height:1; margin-bottom:5px; }
        .engage-note  {
          font-size:0.7rem; display:inline-flex; align-items:center; gap:3px;
          background:rgba(255,255,255,0.12); border-radius:999px;
          padding:2px 8px; color:rgba(255,255,255,0.65);
        }
      `}</style>

      <div className="adm-root">

        {/* Header */}
        <header className="adm-header">
          <div>
            <h2>Admin <em>Overview</em></h2>
            <p>Real-time food waste &amp; engagement data</p>
          </div>
          <div className="live-badge">
            <span className="live-dot" />
            <Activity size={13} /> Live Data
          </div>
        </header>

        {/* Stat cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon red"><PieChart size={18} /></div>
            <p className="stat-label">Total Waste</p>
            <p className="stat-val">47.2 <span>kg</span></p>
            <span className="stat-pill"><TrendingDown size={11} /> –12% vs last week</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon indigo"><IndianRupee size={18} /></div>
            <p className="stat-label">Value Lost</p>
            <p className="stat-val">₹2,840</p>
            <span className="stat-pill"><TrendingDown size={11} /> –8% vs last week</span>
          </div>
        </div>

        {/* Waste chart card */}
        <div className="section-card">
          <h3>
            <Flame size={17} color="#ef4444" />
            Highest Waste Dishes
            <span className="week-tag">This week</span>
          </h3>

          {/* Metric row */}
          <div className="metric-row">
            <div className="metric-mini">
              <p className="metric-mini-label">Total wasted</p>
              <p className="metric-mini-val">47.2 kg</p>
            </div>
            <div className="metric-mini">
              <p className="metric-mini-label">Value lost</p>
              <p className="metric-mini-val">₹2,840</p>
            </div>
            <div className="metric-mini">
              <p className="metric-mini-label">Worst day</p>
              <p className="metric-mini-val">Thursday</p>
            </div>
          </div>

          {/* Legend */}
          <div className="legend-row">
            {[['#e24b4a','High (>8 kg)'],['#ef9f27','Medium (4–8 kg)'],['#97c459','Low (<4 kg)']].map(([c,l]) => (
              <span key={l} className="legend-item">
                <span className="legend-dot" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>

          {/* Horizontal bars */}
          <div className="bar-chart">
            {DISHES.map((d) => {
              const pct = (d.kg / MAX_KG) * 100;
              return (
                <div key={d.name} className="bar-row">
                  <span className="bar-label">{d.name}</span>
                  <div className="bar-track-outer">
                    <div
                      className="bar-fill-inner"
                      style={{
                        width: animated ? `${pct}%` : '0%',
                        background: d.color,
                      }}
                    >
                      <span>{d.kg} kg</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail rows */}
          <div className="detail-section">
            <p className="detail-section-title">Dish detail</p>
            {DISHES.map((d) => (
              <div key={d.name} className="detail-row">
                <div className="detail-dot-wrap" style={{ background: d.color + '22' }}>
                  <span className="detail-dot" style={{ background: d.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="detail-name">{d.name}</p>
                  <p className="detail-note">{d.note}</p>
                </div>
                <p className="detail-kg" style={{ color: d.color }}>{d.kg} kg</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement card */}
        <div className="engage-card">
          <h3>
            <Users size={18} color="rgba(255,255,255,0.6)" />
            Student Engagement
          </h3>
          <div className="engage-grid">
            <div>
              <p className="engage-label">Pre-booking Rate</p>
              <p className="engage-val">—</p>
              <span className="engage-note"><Utensils size={10} /> No data yet</span>
            </div>
            <div>
              <p className="engage-label">Avg Skipped / Day</p>
              <p className="engage-val">—</p>
              <span className="engage-note">No data yet</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}