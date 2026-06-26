import { useState } from "react";

/* ─── Icons ─── */
const I = {
  home:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  assign:   <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>,
  upload:   <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  review:   <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  students: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  analytics:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  bell:     <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  settings: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  logout:   <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  ocr:      <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/></svg>,
};

const NAV = [
  { label: "Overview",           icon: I.home,      group: "main" },
  { label: "Assignments",        icon: I.assign,    group: "main", badge: 2 },
  { label: "Upload Answer Key",  icon: I.upload,    group: "main", cta: true },
  { label: "Review Submissions", icon: I.review,    group: "main", badge: 14 },
  { label: "Students",           icon: I.students,  group: "main" },
  { label: "Analytics",          icon: I.analytics, group: "main" },
  { label: "Notifications",      icon: I.bell,      group: "support", badge: 3 },
  { label: "Settings",           icon: I.settings,  group: "support" },
];

 function Faculty() {
  const [active, setActive] = useState("Overview");

  const MAIN    = NAV.filter(n => n.group === "main");
  const SUPPORT = NAV.filter(n => n.group === "support");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          background: #06091a;
          font-family: 'Inter', sans-serif;
        }

        /* ── Full-page shell ── */
        .shell {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #06091a;
        }

        /* ══════════════════════════════
           SIDEBAR = strip + panel
        ══════════════════════════════ */
        .sidebar {
          display: flex;
          flex-direction: row;
          height: 100vh;
          flex-shrink: 0;
        }

        /* ── Icon strip ── */
        .strip {
          width: 60px;
          height: 100vh;
          background: #040810;
          border-right: 1px solid rgba(99, 140, 255, 0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.1rem 0 1.1rem;
          gap: 2px;
          flex-shrink: 0;
        }

        .strip-logo {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.4);
          flex-shrink: 0;
          cursor: pointer;
        }

        .strip-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #253550;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: background 0.15s, color 0.15s, transform 0.12s;
          position: relative;
          flex-shrink: 0;
        }
        .strip-icon:hover {
          background: rgba(124, 58, 237, 0.12);
          color: #7c6aaa;
          transform: scale(1.07);
        }
        .strip-icon.active {
          background: rgba(124, 58, 237, 0.22);
          color: #a78bfa;
        }
        .strip-icon.cta { color: #a78bfa; }
        .strip-icon.cta:hover {
          background: rgba(124, 58, 237, 0.15);
          color: #c4b5fd;
        }

        /* Left pip on active */
        .strip-icon.active::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: #7c3aed;
          border-radius: 0 3px 3px 0;
        }

        /* Badge dot */
        .strip-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f59e0b;
          border: 1.5px solid #040810;
        }

        .strip-spacer { flex: 1; }

        .strip-divider {
          width: 28px;
          height: 1px;
          background: rgba(99, 140, 255, 0.08);
          margin: 0.5rem 0;
        }

        .strip-av {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          color: #fff;
          cursor: pointer;
          border: 2px solid rgba(124, 58, 237, 0.25);
          transition: border-color 0.15s, transform 0.12s;
          margin-top: 0.5rem;
        }
        .strip-av:hover {
          border-color: rgba(124, 58, 237, 0.55);
          transform: scale(1.06);
        }

        /* ── Panel ── */
        .panel {
          width: 220px;
          height: 100vh;
          background: #080f22;
          border-right: 1px solid rgba(99, 140, 255, 0.08);
          display: flex;
          flex-direction: column;
          padding: 1.25rem 0.8rem 1rem;
          flex-shrink: 0;
        }

        .panel-head {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
          color: #1e3060;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
          padding: 0 0.35rem;
        }

        .panel-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.54rem 0.7rem;
          border-radius: 9px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #3a5070;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: all 0.14s ease;
          width: 100%;
          text-align: left;
          white-space: nowrap;
        }
        .panel-link:hover {
          color: #8ab0d8;
          background: rgba(99, 140, 255, 0.07);
        }
        .panel-link.active {
          color: #c0d0ff;
          background: rgba(124, 58, 237, 0.18);
        }
        .panel-link.cta {
          color: #a78bfa;
          background: rgba(124, 58, 237, 0.09);
          border: 1px solid rgba(124, 58, 237, 0.2);
          margin: 0.2rem 0;
        }
        .panel-link.cta:hover {
          background: rgba(124, 58, 237, 0.16);
          border-color: rgba(124, 58, 237, 0.35);
        }

        .panel-badge {
          margin-left: auto;
          background: #f59e0b;
          color: #06091a;
          font-size: 0.58rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .panel-spacer { flex: 1; }

        /* ── Pending card ── */
        .pending-card {
          background: #060c1c;
          border: 1px solid rgba(99, 140, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          text-align: center;
          margin-bottom: 0.85rem;
        }
        .pending-label {
          font-size: 0.67rem;
          color: #3a5070;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .pending-count { line-height: 1; margin-bottom: 0.45rem; }
        .pending-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #f59e0b;
        }
        .pending-word {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #8899bb;
        }
        .pending-due {
          font-size: 0.66rem;
          color: #3a5070;
          font-weight: 500;
        }

        /* ── Footer ── */
        .panel-footer {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(99, 140, 255, 0.07);
        }
        .footer-av {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          color: #fff;
          flex-shrink: 0;
        }
        .footer-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: #6a80a0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .footer-dept { font-size: 0.62rem; color: #1e3050; }
        .footer-logout {
          margin-left: auto;
          background: none;
          border: none;
          color: #1e3050;
          cursor: pointer;
          padding: 4px;
          transition: color 0.15s;
          flex-shrink: 0;
        }
        .footer-logout:hover { color: #ef4444; }

        /* ══════════════════════════════
           MAIN CONTENT AREA
        ══════════════════════════════ */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #06091a;
          min-width: 0;
        }

        /* Topbar */
        .topbar {
          height: 58px;
          background: #07101f;
          border-bottom: 1px solid rgba(99, 140, 255, 0.07);
          display: flex;
          align-items: center;
          padding: 0 1.75rem;
          gap: 1rem;
          flex-shrink: 0;
        }
        .topbar-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #c0d0ee;
          flex: 1;
        }
        .topbar-chip {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(124, 58, 237, 0.14);
          border: 1px solid rgba(124, 58, 237, 0.25);
          color: #a78bfa;
          border-radius: 5px;
          padding: 3px 8px;
        }
        .topbar-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(99, 140, 255, 0.06);
          border: none;
          color: #2e4468;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          position: relative;
        }
        .topbar-icon:hover { background: rgba(99, 140, 255, 0.13); color: #7ca3ff; }
        .topbar-notif-dot {
          position: absolute;
          top: 7px; right: 7px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          border: 1.5px solid #07101f;
        }
        .topbar-av {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 0.68rem; color: #fff;
          cursor: pointer;
        }

        /* Content */
        .content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(124, 58, 237, 0.2) transparent;
        }

        /* Placeholder cards */
        .ph-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .ph-card {
          background: #07101f;
          border: 1px solid rgba(99, 140, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ph-label { font-size: 0.65rem; color: #1e3050; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .ph-val {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.75rem; font-weight: 700; line-height: 1;
        }
        .ph-sub { font-size: 0.68rem; color: #2a4060; }

        .ph-wide {
          background: #07101f;
          border: 1px solid rgba(99, 140, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a2a44;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="shell">

        {/* ══ SIDEBAR ══ */}
        <div className="sidebar">

          {/* Strip */}
          <div className="strip">
            <div className="strip-logo">{I.ocr}</div>

            {MAIN.map(link => (
              <button
                key={link.label}
                title={link.label}
                className={[
                  "strip-icon",
                  active === link.label ? "active" : "",
                  link.cta ? "cta" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => setActive(link.label)}
              >
                {link.icon}
                {link.badge && <span className="strip-dot" />}
              </button>
            ))}

            <div className="strip-spacer" />
            <div className="strip-divider" />

            {SUPPORT.map(link => (
              <button
                key={link.label}
                title={link.label}
                className={`strip-icon${active === link.label ? " active" : ""}`}
                onClick={() => setActive(link.label)}
              >
                {link.icon}
                {link.badge && <span className="strip-dot" />}
              </button>
            ))}

            <div className="strip-av" title="Dr. R. Mehta">RM</div>
          </div>

          {/* Panel */}
          <div className="panel">
            <div className="panel-head">Faculty Panel</div>

            {MAIN.map(link => (
              <button
                key={link.label}
                className={[
                  "panel-link",
                  active === link.label ? "active" : "",
                  link.cta ? "cta" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => setActive(link.label)}
              >
                {link.icon}
                {link.label}
                {link.badge && <span className="panel-badge">{link.badge}</span>}
              </button>
            ))}

            <div className="panel-spacer" />

            {/* Pending card */}
            <div className="pending-card">
              <div className="pending-label">Awaiting review</div>
              <div className="pending-count">
                <span className="pending-num">14</span>
                <span className="pending-word"> papers</span>
              </div>
              <div className="pending-due">Due by Friday</div>
            </div>

            {/* Footer */}
            <div className="panel-footer">
              <div className="footer-av">RM</div>
              <div style={{ minWidth: 0 }}>
                <div className="footer-name">Dr. R. Mehta</div>
                <div className="footer-dept">CE · LJIET</div>
              </div>
              <button className="footer-logout">{I.logout}</button>
            </div>
          </div>

        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div className="main">

          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-title">Faculty Overview</div>
            <span className="topbar-chip">Faculty</span>
            <button className="topbar-icon">
              {I.bell}
              <span className="topbar-notif-dot" />
            </button>
            <div className="topbar-av">RM</div>
          </div>

          {/* Content placeholder */}
          <div className="content">
            <div className="ph-row">
              {[
                { label: "Total Students", val: "63",  sub: "CE Sem 4",      color: "#a78bfa" },
                { label: "Pending Review", val: "14",  sub: "Due by Friday", color: "#f59e0b" },
                { label: "Avg Score",      val: "76%", sub: "This semester", color: "#6495ed" },
              ].map(({ label, val, sub, color }) => (
                <div className="ph-card" key={label}>
                  <div className="ph-label">{label}</div>
                  <div className="ph-val" style={{ color }}>{val}</div>
                  <div className="ph-sub">{sub}</div>
                </div>
              ))}
            </div>
            <div className="ph-wide">— {active} content goes here —</div>
            <div className="ph-wide" style={{ height: 120 }}>— Recent submissions table —</div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Faculty;