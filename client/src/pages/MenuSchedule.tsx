import { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, CalendarDays, Soup } from 'lucide-react';

const MEALS = [
  { id: 'breakfast', label: 'Breakfast', time: '7:30 – 9:00 AM', emoji: '🌅', color: '#92400e', bg: '#fffbeb', border: '#fde68a' },
  { id: 'lunch',     label: 'Lunch',     time: '12:30 – 2:00 PM', emoji: '☀️', color: '#14532d', bg: '#f0fdf4', border: '#bbf7d0' },
  { id: 'dinner',    label: 'Dinner',    time: '8:00 – 9:30 PM',  emoji: '🌙', color: '#1e3a5f', bg: '#eff6ff', border: '#bfdbfe' },
];

const CATEGORIES = ['Vegetarian', 'Non-Vegetarian', 'Contains Egg'];
const TAGS = ['Breakfast', 'Main Course', 'Side Dish', 'Dessert', 'Soup', 'Salad'];

export default function MenuSchedule() {
  const [view, setView] = useState<'Week' | 'Month'>('Week');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ms-root {
          font-family: 'DM Sans', sans-serif;
          padding-bottom: 100px;
        }
        /* ── Header ── */
        .ms-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 14px; margin-bottom: 22px;
        }
        .ms-header h2 {
          font-family: 'Instrument Serif', serif;
          font-size: 1.9rem; color: #111827; margin: 0 0 3px; line-height: 1.15;
        }
        .ms-header h2 em { font-style: italic; color: #16a34a; }
        .ms-header p { font-size: 0.8rem; color: #6b7280; margin: 0; }
        .view-pills {
          display: flex; gap: 6px; background: #f3f4f6;
          padding: 4px; border-radius: 12px;
        }
        .view-pill {
          padding: 6px 16px; border-radius: 9px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
          background: transparent; color: #6b7280;
        }
        .view-pill.active {
          background: #fff; color: #111827;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        /* ── Main container ── */
        .ms-panel {
          background: #fff; border-radius: 22px;
          border: 1px solid #f3f4f6;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          overflow: hidden;
          animation: fadeUp 0.45s ease both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── Toolbar ── */
        .ms-toolbar {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 10px;
          padding: 16px 18px;
          border-bottom: 1px solid #f3f4f6;
          background: #fafafa;
        }
        .nav-btns { display: flex; gap: 6px; }
        .nav-btn {
          width: 34px; height: 34px; border-radius: 10px;
          border: 1.5px solid #e5e7eb; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #374151;
          transition: all 0.15s;
        }
        .nav-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .today-btn {
          padding: 7px 14px; border-radius: 10px;
          border: 1.5px solid #e5e7eb; background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 600;
          color: #374151; cursor: pointer; transition: all 0.15s;
        }
        .today-btn:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
        .search-wrap {
          display: flex; align-items: center; gap: 8px;
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 12px; padding: 7px 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-wrap:focus-within {
          border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
        }
        .search-wrap input {
          border: none; outline: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #111827;
          width: 150px;
        }
        .search-wrap input::placeholder { color: #9ca3af; }
        .new-dish-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #15803d, #22c55e);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 14px rgba(22,163,74,0.28);
          transition: all 0.18s;
        }
        .new-dish-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.35); }

        /* ── Body grid ── */
        .ms-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 900px) {
          .ms-body { grid-template-columns: 260px 1fr; }
        }

        /* ── Sidebar ── */
        .ms-sidebar {
          padding: 18px; border-right: 1px solid #f3f4f6;
          display: flex; flex-direction: column; gap: 16px;
        }
        .lib-card {
          background: #f9fafb; border: 1px solid #f3f4f6;
          border-radius: 16px; padding: 14px;
        }
        .lib-card-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .lib-card-head h3 {
          font-size: 0.82rem; font-weight: 700; color: #374151; margin: 0;
        }
        .lib-card-head span { font-size: 0.7rem; color: #9ca3af; }
        .cat-btn {
          width: 100%; text-align: left;
          padding: 8px 12px; border-radius: 10px;
          border: 1.5px solid #e5e7eb; background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          font-weight: 500; color: #374151; cursor: pointer;
          transition: all 0.15s; margin-bottom: 6px;
          display: flex; align-items: center; gap: 7px;
        }
        .cat-btn:last-child { margin-bottom: 0; }
        .cat-btn:hover { border-color: #16a34a; color: #14532d; background: #f0fdf4; }
        .cat-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .tag-grid { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag-pill {
          font-size: 0.7rem; color: #6b7280;
          border: 1px solid #e5e7eb; background: #fff;
          border-radius: 999px; padding: 4px 10px; cursor: pointer;
          transition: all 0.15s; font-weight: 500;
        }
        .tag-pill:hover { border-color: #16a34a; color: #15803d; background: #f0fdf4; }

        /* ── Schedule grid ── */
        .ms-schedule { padding: 18px; }
        .meal-cols {
          display: grid; grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .meal-cols { grid-template-columns: repeat(3, 1fr); }
        }
        .meal-col {
          border-radius: 18px; overflow: hidden;
          border: 1.5px solid;
        }
        .meal-col-head {
          padding: 12px 14px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .meal-col-title {
          display: flex; align-items: center; gap: 7px;
        }
        .meal-col-emoji { font-size: 1.1rem; }
        .meal-col-name { font-size: 0.85rem; font-weight: 700; }
        .meal-col-time { font-size: 0.68rem; opacity: 0.65; }
        .meal-col-body { padding: 12px; background: #fff; }
        .empty-slot {
          border: 1.5px dashed #e5e7eb;
          border-radius: 12px; padding: 22px 12px;
          text-align: center;
        }
        .empty-slot-icon { font-size: 1.6rem; margin-bottom: 6px; opacity: 0.4; }
        .empty-slot p { font-size: 0.75rem; color: #9ca3af; margin: 0; }
        .ms-tip {
          font-size: 0.72rem; color: #9ca3af; margin-top: 16px;
          display: flex; align-items: center; gap: 5px;
          background: #f9fafb; border-radius: 10px; padding: 8px 12px;
          border: 1px solid #f3f4f6;
        }
      `}</style>

      <div className="ms-root">
        {/* Header */}
        <header className="ms-header">
          <div>
            <h2>Weekly <em>Menu</em> Schedule</h2>
            <p>Plan and optimise meals for the week</p>
          </div>
          <div className="view-pills">
            {(['Week', 'Month'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`view-pill ${view === v ? 'active' : ''}`}>{v}</button>
            ))}
          </div>
        </header>

        <div className="ms-panel">
          {/* Toolbar */}
          <div className="ms-toolbar">
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div className="nav-btns">
                <button className="nav-btn"><ChevronLeft size={16} /></button>
                <button className="nav-btn"><ChevronRight size={16} /></button>
              </div>
              <button className="today-btn">
                <CalendarDays size={13} style={{ display:'inline', marginRight:4 }} />
                Today
              </button>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
              <div className="search-wrap">
                <Search size={15} color="#9ca3af" />
                <input placeholder="Search dishes…" aria-label="Search dishes" />
              </div>
              <button className="new-dish-btn">
                <Plus size={15} /> New Dish
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="ms-body">
            {/* Sidebar */}
            <aside className="ms-sidebar">
              <div className="lib-card">
                <div className="lib-card-head">
                  <h3>Dish Library</h3>
                  <span>0 items</span>
                </div>
                {[
                  { label: 'Vegetarian',     color: '#16a34a' },
                  { label: 'Non-Vegetarian', color: '#ef4444' },
                  { label: 'Contains Egg',   color: '#f59e0b' },
                ].map(c => (
                  <button key={c.label} className="cat-btn">
                    <span className="cat-dot" style={{ background: c.color }} />
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="lib-card">
                <div className="lib-card-head">
                  <h3>Tags</h3>
                </div>
                <div className="tag-grid">
                  {TAGS.map(t => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Schedule */}
            <section className="ms-schedule">
              <div className="meal-cols">
                {MEALS.map(m => (
                  <div key={m.id} className="meal-col"
                    style={{ borderColor: m.border }}>
                    <div className="meal-col-head" style={{ background: m.bg }}>
                      <div className="meal-col-title">
                        <span className="meal-col-emoji">{m.emoji}</span>
                        <span className="meal-col-name" style={{ color: m.color }}>
                          {m.label}
                        </span>
                      </div>
                      <span className="meal-col-time" style={{ color: m.color }}>
                        {m.time}
                      </span>
                    </div>
                    <div className="meal-col-body">
                      <div className="empty-slot">
                        <div className="empty-slot-icon">
                          <Soup size={24} color="#d1d5db" />
                        </div>
                        <p>No dishes scheduled</p>  
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="ms-tip">
                💡 Drag dishes from the library into a meal slot to schedule them.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}