import { useState } from "react";

/* ─── Icons ─── */
const Ico = {
  dashboard: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  upload: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  file: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
  chart: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  trophy: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  ),
  bell: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  settings: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  help: (
    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  logout: (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  ocr: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 8h10M7 12h6M7 16h8" />
    </svg>
  ),
  chevRight: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  chevLeft: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  arrowUp: (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  clock: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  star: (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: Ico.dashboard, group: "main" },
  { key: "upload", label: "Upload Answer", icon: Ico.upload, group: "main", cta: true },
  { key: "submissions", label: "Submissions", icon: Ico.file, group: "main", badge: 3 },
  { key: "results", label: "My Results", icon: Ico.chart, group: "main" },
  { key: "leaderboard", label: "Leaderboard", icon: Ico.trophy, group: "main" },
  { key: "notifs", label: "Notifications", icon: Ico.bell, group: "bottom", badge: 2 },
  { key: "settings", label: "Settings", icon: Ico.settings, group: "bottom" },
  { key: "help", label: "Help", icon: Ico.help, group: "bottom" },
];

const RECENT = [
  { name: "Assignment 3 — Algorithms", score: 87, total: 100, date: "2 days ago", rank: 4 },
  { name: "Assignment 2 — OS Theory", score: 74, total: 100, date: "1 week ago", rank: 11 },
  { name: "Assignment 1 — Data Struct", score: 91, total: 100, date: "2 weeks ago", rank: 2 },
];

const UPCOMING = [
  { name: "Assignment 4 — Networks", due: "Fri, 28 Jun", status: "open" },
  { name: "Assignment 5 — DBMS", due: "Mon, 1 Jul", status: "upcoming" },
];

export default function StudentSidebarV2() {
  const [active, setActive] = useState("dashboard");
  const [expanded, setExpanded] = useState(true);
  const [hoveredRail, setHoveredRail] = useState(null);

  const MAIN = NAV_ITEMS.filter(n => n.group === "main");
  const BOTTOM = NAV_ITEMS.filter(n => n.group === "bottom");

  const RAIL_W = 64;
  const PANEL_W = expanded ? 210 : 0;
  const SIDEBAR_W = RAIL_W + PANEL_W;

  const scoreAvg = 84;
  const semPct = 72;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080f1e; font-family: 'Inter', sans-serif; }

        /* ── Root shell ── */
        .shell {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #080f1e;
        }

        /* ══════════════════════════════
           SIDEBAR
        ══════════════════════════════ */
        .sidebar {
          display: flex;
          flex-shrink: 0;
          height: 100vh;
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── Rail ── */
        .rail {
          width: 64px;
          background: #050b18;
          border-right: 1px solid rgba(99,140,255,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.9rem 0 1rem;
          gap: 0;
          flex-shrink: 0;
          z-index: 2;
        }

        .rail-logo {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b5bdb 100%);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 16px rgba(59,91,219,0.45);
          margin-bottom: 1.1rem;
          cursor: pointer;
          flex-shrink: 0;
        }

        .rail-icon-wrap {
          position: relative;
          width: 64px;
          display: flex;
          justify-content: center;
          margin-bottom: 2px;
        }

        .rail-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #2e4468;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: background 0.15s, color 0.15s, transform 0.12s;
          flex-shrink: 0;
        }
        .rail-icon:hover {
          background: rgba(59,91,219,0.12);
          color: #7ca3ff;
          transform: scale(1.06);
        }
        .rail-icon.active {
          background: rgba(59,91,219,0.22);
          color: #93b8ff;
        }
        .rail-icon.cta {
          color: #f59e0b;
        }
        .rail-icon.cta:hover {
          background: rgba(245,158,11,0.12);
          color: #fbbf24;
        }
        .rail-icon.cta.active {
          background: rgba(245,158,11,0.15);
          color: #fbbf24;
        }

        /* Active left pip */
        .rail-pip {
          position: absolute;
          left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 20px;
          background: #3b5bdb;
          border-radius: 0 3px 3px 0;
        }
        .rail-pip.cta { background: #f59e0b; }

        /* Badge on rail icon */
        .rail-badge {
          position: absolute;
          top: 4px; right: 8px;
          min-width: 16px; height: 16px;
          background: #f59e0b; color: #080f1e;
          font-size: 0.58rem; font-weight: 700;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px;
          border: 1.5px solid #050b18;
        }

        /* Tooltip on rail hover */
        .rail-tooltip {
          position: fixed;
          left: 70px;
          background: #0f1e38;
          border: 1px solid rgba(99,140,255,0.18);
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #c0d4f0;
          white-space: nowrap;
          pointer-events: none;
          z-index: 999;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          animation: tooltipIn 0.1s ease;
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .rail-spacer { flex: 1; }
        .rail-divider { width: 28px; height: 1px; background: rgba(99,140,255,0.08); margin: 0.5rem 0; }

        /* Avatar on rail */
        .rail-av {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #1e40af, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.72rem; color: #e8f0ff;
          cursor: pointer;
          border: 2px solid rgba(99,140,255,0.2);
          transition: border-color 0.15s, transform 0.12s;
          margin-top: 0.5rem;
        }
        .rail-av:hover { border-color: rgba(99,140,255,0.5); transform: scale(1.06); }

        /* ── Panel ── */
        .panel {
          width: 210px;
          background: #07101f;
          border-right: 1px solid rgba(99,140,255,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease;
        }
        .panel.collapsed {
          width: 0;
          opacity: 0;
          pointer-events: none;
        }
        .panel.expanded {
          width: 210px;
          opacity: 1;
        }

        .panel-inner {
          width: 210px;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1rem 0.65rem;
          overflow: hidden;
        }

        /* Panel header */
        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.3rem 0.9rem;
          border-bottom: 1px solid rgba(99,140,255,0.07);
          margin-bottom: 0.85rem;
        }
        .panel-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 1rem; color: #d8eaff;
        }
        .panel-brand span { color: #f59e0b; }
        .panel-toggle {
          width: 24px; height: 24px;
          border-radius: 6px;
          background: rgba(99,140,255,0.07);
          border: none; color: #3a5578; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .panel-toggle:hover { background: rgba(99,140,255,0.15); color: #7ca3ff; }

        /* Panel section label */
        .panel-grp {
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #1e3050; padding: 0 0.4rem;
          margin: 0.55rem 0 0.25rem;
        }

        /* Panel nav items */
        .panel-link {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.5rem 0.65rem;
          border-radius: 9px;
          font-size: 0.82rem; font-weight: 500;
          color: #3a5570;
          cursor: pointer; border: none; background: transparent;
          transition: all 0.14s ease;
          width: 100%; text-align: left;
          white-space: nowrap;
        }
        .panel-link:hover {
          color: #90b8e0;
          background: rgba(59,91,219,0.08);
        }
        .panel-link.active {
          color: #b8d8ff;
          background: rgba(59,91,219,0.16);
        }
        .panel-link.cta {
          color: #f59e0b;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.18);
          margin: 0.2rem 0;
        }
        .panel-link.cta:hover {
          background: rgba(245,158,11,0.13);
          border-color: rgba(245,158,11,0.35);
        }
        .panel-badge {
          margin-left: auto;
          background: #f59e0b; color: #080f1e;
          font-size: 0.58rem; font-weight: 700;
          min-width: 17px; height: 17px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px;
        }

        /* Semester progress */
        .panel-progress {
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(99,140,255,0.07);
        }
        .prog-row {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 5px;
        }
        .prog-label { font-size: 0.65rem; color: #2a4060; font-weight: 500; }
        .prog-val   { font-size: 0.65rem; color: #f59e0b; font-weight: 600; }
        .prog-track {
          height: 4px; background: rgba(99,140,255,0.08);
          border-radius: 4px; overflow: hidden;
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e3a8a, #f59e0b);
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        /* Panel user footer */
        .panel-user {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.75rem 0.4rem 0;
          border-top: 1px solid rgba(99,140,255,0.07);
          margin-top: 0.65rem;
        }
        .panel-uav {
          width: 30px; height: 30px; border-radius: 7px;
          background: linear-gradient(135deg, #1e40af, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.68rem; color: #e8f0ff;
          flex-shrink: 0;
        }
        .panel-uname { font-size: 0.77rem; font-weight: 600; color: #8099c0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .panel-urole { font-size: 0.62rem; color: #2a4060; white-space: nowrap; }
        .panel-ulo {
          margin-left: auto; background: none; border: none;
          color: #1e3050; cursor: pointer; padding: 4px;
          transition: color 0.15s; flex-shrink: 0;
        }
        .panel-ulo:hover { color: #ef4444; }

        /* Toggle button when panel collapsed — on rail */
        .rail-expand-btn {
          width: 40px; height: 28px;
          border-radius: 8px;
          background: rgba(59,91,219,0.1);
          border: 1px solid rgba(59,91,219,0.18);
          color: #3b5bdb; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          margin-bottom: 0.5rem;
        }
        .rail-expand-btn:hover { background: rgba(59,91,219,0.2); color: #7ca3ff; }

        /* ══════════════════════════════
           MAIN CONTENT
        ══════════════════════════════ */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        /* Topbar */
        .topbar {
          height: 58px;
          background: #07101f;
          border-bottom: 1px solid rgba(99,140,255,0.07);
          display: flex; align-items: center;
          padding: 0 1.5rem;
          gap: 1rem;
          flex-shrink: 0;
        }
        .topbar-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 1.05rem; color: #c8deff;
          flex: 1;
        }
        .topbar-sub { font-size: 0.72rem; color: #2a4060; font-weight: 400; margin-left: 0.4rem; }
        .topbar-search {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(99,140,255,0.05);
          border: 1px solid rgba(99,140,255,0.1);
          border-radius: 8px; padding: 0.35rem 0.75rem;
        }
        .topbar-search input {
          background: none; border: none; outline: none;
          font-size: 0.8rem; color: #7090b0; width: 140px;
          font-family: 'Inter', sans-serif;
        }
        .topbar-search input::placeholder { color: #2a4060; }
        .topbar-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,140,255,0.06); border: none;
          color: #2e4468; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; position: relative;
        }
        .topbar-icon:hover { background: rgba(99,140,255,0.13); color: #7ca3ff; }
        .topbar-notif-dot {
          position: absolute; top: 7px; right: 7px;
          width: 6px; height: 6px; border-radius: 50%;
          background: #f59e0b; border: 1.5px solid #07101f;
        }
        .topbar-av {
          width: 30px; height: 30px; border-radius: 8px;
          background: linear-gradient(135deg, #1e40af, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.68rem; color: #e8f0ff; cursor: pointer;
        }

        /* Content area */
        .content {
          flex: 1; overflow-y: auto;
          padding: 1.5rem;
          display: flex; flex-direction: column; gap: 1.25rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(59,91,219,0.2) transparent;
        }
        .content::-webkit-scrollbar { width: 5px; }
        .content::-webkit-scrollbar-track { background: transparent; }
        .content::-webkit-scrollbar-thumb { background: rgba(59,91,219,0.2); border-radius: 3px; }

        /* Welcome banner */
        .welcome {
          background: linear-gradient(120deg, rgba(30,58,138,0.45) 0%, rgba(59,91,219,0.2) 60%, rgba(245,158,11,0.08) 100%);
          border: 1px solid rgba(59,91,219,0.18);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
        }
        .welcome-text h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 1.15rem; color: #d8eaff;
          margin-bottom: 3px;
        }
        .welcome-text p { font-size: 0.78rem; color: #4a6a90; }
        .welcome-cta {
          display: flex; align-items: center; gap: 0.45rem;
          background: linear-gradient(135deg, #1e3a8a, #3b5bdb);
          border: none; border-radius: 9px;
          padding: 0.55rem 1rem;
          font-size: 0.8rem; font-weight: 600; color: #d8eaff;
          cursor: pointer; white-space: nowrap;
          transition: opacity 0.15s; box-shadow: 0 4px 16px rgba(59,91,219,0.3);
        }
        .welcome-cta:hover { opacity: 0.85; }

        /* Stat cards */
        .stat-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.85rem;
        }
        .stat-card {
          background: #07101f;
          border: 1px solid rgba(99,140,255,0.09);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          display: flex; flex-direction: column; gap: 0.35rem;
        }
        .stat-card-label { font-size: 0.65rem; color: #2a4060; font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; }
        .stat-card-val {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem; font-weight: 700; line-height: 1;
        }
        .stat-card-delta {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 0.65rem; font-weight: 500;
        }

        /* Score ring */
        .score-ring-svg { display: block; }
        .sr-bg { fill: none; stroke: rgba(99,140,255,0.1); stroke-width: 5; }
        .sr-fg { fill: none; stroke-width: 5; stroke-linecap: round; }

        /* Two-col section */
        .two-col {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0.85rem;
        }

        /* Table card */
        .card {
          background: #07101f;
          border: 1px solid rgba(99,140,255,0.09);
          border-radius: 12px;
          overflow: hidden;
        }
        .card-head {
          padding: 0.9rem 1.1rem;
          border-bottom: 1px solid rgba(99,140,255,0.07);
          display: flex; align-items: center; justify-content: space-between;
        }
        .card-head-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: #9ab8d8;
        }
        .card-head-link { font-size: 0.72rem; color: #2a4a7a; cursor: pointer; transition: color 0.15s; }
        .card-head-link:hover { color: #5a80c0; }

        /* Recent results rows */
        .result-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1.1rem;
          border-bottom: 1px solid rgba(99,140,255,0.05);
          transition: background 0.12s;
        }
        .result-row:last-child { border-bottom: none; }
        .result-row:hover { background: rgba(59,91,219,0.04); }
        .result-name { font-size: 0.8rem; font-weight: 500; color: #7090b0; flex: 1; }
        .result-score {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem; font-weight: 700;
        }
        .result-chip {
          font-size: 0.6rem; font-weight: 600; padding: 2px 7px;
          border-radius: 5px; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .result-date { font-size: 0.63rem; color: #1e3050; display: flex; align-items: center; gap: 3px; }
        .result-rank { font-size: 0.65rem; color: #2a4060; display: flex; align-items: center; gap: 3px; }

        /* Upcoming card */
        .upcoming-row {
          padding: 0.8rem 1.1rem;
          border-bottom: 1px solid rgba(99,140,255,0.05);
          display: flex; flex-direction: column; gap: 4px;
        }
        .upcoming-row:last-child { border-bottom: none; }
        .upcoming-name { font-size: 0.81rem; font-weight: 500; color: #6080a0; }
        .upcoming-meta { display: flex; align-items: center; gap: 0.6rem; }
        .upcoming-due { font-size: 0.65rem; color: #2a4060; display: flex; align-items: center; gap: 3px; }
        .status-chip {
          font-size: 0.58rem; font-weight: 700; padding: 2px 7px;
          border-radius: 5px; text-transform: uppercase; letter-spacing: 0.06em;
        }
        .status-open     { background: rgba(59,219,91,0.1);  color: #4ade80; border: 1px solid rgba(59,219,91,0.2); }
        .status-upcoming { background: rgba(99,140,255,0.1); color: #7ca3ff; border: 1px solid rgba(99,140,255,0.2); }

        @media (max-width: 900px) {
          .stat-row { grid-template-columns: 1fr 1fr; }
          .two-col  { grid-template-columns: 1fr; }
          .topbar-search { display: none; }
        }
      `}</style>

      <div className="shell">

        {/* ══ SIDEBAR ══ */}
        <div className="sidebar" style={{ width: SIDEBAR_W }}>

          {/* Rail */}
          <div className="rail">
            <div className="rail-logo" onClick={() => setExpanded(e => !e)}>
              {Ico.ocr}
            </div>

            {/* Expand/collapse toggle when collapsed */}
            {!expanded && (
              <button className="rail-expand-btn" onClick={() => setExpanded(true)} title="Expand panel">
                {Ico.chevRight}
              </button>
            )}

            {/* Main nav icons */}
            {MAIN.map(item => (
              <div
                key={item.key}
                className="rail-icon-wrap"
                onMouseEnter={() => !expanded && setHoveredRail(item.key)}
                onMouseLeave={() => setHoveredRail(null)}
              >
                {active === item.key && (
                  <div className={`rail-pip${item.cta ? " cta" : ""}`} />
                )}
                <button
                  className={`rail-icon${active === item.key ? " active" : ""}${item.cta ? " cta" : ""}`}
                  onClick={() => setActive(item.key)}
                  title={item.label}
                >
                  {item.icon}
                </button>
                {item.badge && <div className="rail-badge">{item.badge}</div>}

                {/* Tooltip when panel is collapsed */}
                {!expanded && hoveredRail === item.key && (
                  <div className="rail-tooltip" style={{ top: "auto" }}>
                    {item.label}
                    {item.badge ? ` (${item.badge})` : ""}
                  </div>
                )}
              </div>
            ))}

            <div className="rail-spacer" />
            <div className="rail-divider" />

            {/* Bottom nav icons */}
            {BOTTOM.map(item => (
              <div
                key={item.key}
                className="rail-icon-wrap"
                onMouseEnter={() => !expanded && setHoveredRail(item.key)}
                onMouseLeave={() => setHoveredRail(null)}
              >
                {active === item.key && <div className="rail-pip" />}
                <button
                  className={`rail-icon${active === item.key ? " active" : ""}`}
                  onClick={() => setActive(item.key)}
                >
                  {item.icon}
                </button>
                {item.badge && <div className="rail-badge">{item.badge}</div>}
                {!expanded && hoveredRail === item.key && (
                  <div className="rail-tooltip">{item.label}</div>
                )}
              </div>
            ))}

            <div className="rail-av" title="Kush Patel">KP</div>
          </div>

          {/* Panel */}
          <div className={`panel ${expanded ? "expanded" : "collapsed"}`}>
            <div className="panel-inner">

              {/* Header */}
              <div className="panel-header">
                <div className="panel-brand">OCR<span>Check</span></div>
                <button className="panel-toggle" onClick={() => setExpanded(false)} title="Collapse">
                  {Ico.chevLeft}
                </button>
              </div>

              {/* Main links */}
              <div className="panel-grp">Menu</div>
              {MAIN.map(item => (
                <button
                  key={item.key}
                  className={`panel-link${active === item.key ? " active" : ""}${item.cta ? " cta" : ""}`}
                  onClick={() => setActive(item.key)}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && <span className="panel-badge">{item.badge}</span>}
                </button>
              ))}

              <div className="panel-grp" style={{ marginTop: "0.6rem" }}>Account</div>
              {BOTTOM.map(item => (
                <button
                  key={item.key}
                  className={`panel-link${active === item.key ? " active" : ""}`}
                  onClick={() => setActive(item.key)}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && <span className="panel-badge">{item.badge}</span>}
                </button>
              ))}

              {/* Semester progress */}
              <div className="panel-progress">
                <div className="prog-row">
                  <span className="prog-label">Semester Progress</span>
                  <span className="prog-val">{semPct}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${semPct}%` }} />
                </div>
              </div>

              {/* User footer */}
              <div className="panel-user">
                <div className="panel-uav">KP</div>
                <div style={{ minWidth: 0 }}>
                  <div className="panel-uname">Kush Patel</div>
                  <div className="panel-urole">CE · Sem 4 · LJIET</div>
                </div>
                <button className="panel-ulo">{Ico.logout}</button>
              </div>

            </div>
          </div>
        </div>

        {/* ══ MAIN ══ */}
        <div className="main">

          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-title">
              Dashboard
              <span className="topbar-sub">Welcome back, Kush</span>
            </div>
            <div className="topbar-search">
              <svg width="14" height="14" fill="none" stroke="#2a4060" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input placeholder="Search submissions..." />
            </div>
            <button className="topbar-icon">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="topbar-notif-dot" />
            </button>
            <div className="topbar-av">KP</div>
          </div>

          {/* Content */}
          <div className="content">

            {/* Welcome */}
            <div className="welcome">
              <div className="welcome-text">
                <h2>Good morning, Kush 👋</h2>
                <p>Assignment 4 is open — submit before Friday, 28 Jun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}