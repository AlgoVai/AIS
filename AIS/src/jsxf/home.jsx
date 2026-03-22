import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ico = {
  Dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Admin: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5 3V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M4.5 7.5h7M4.5 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ML: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Seg: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 10.5l3-4 2.5 2.5 3-5 2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 13.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  QA: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12v8H9l-3 2v-2H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  Chat: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
      <circle cx="11" cy="8" r="1.2" fill="currentColor"/>
      <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
};

// ── NavItem ───────────────────────────────────────────────────────────────────
function NavItem({ icon, label, to, active, onClick, hasArrow, open }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "9px 18px", cursor: "pointer",
    borderLeft: active ? "2px solid #a78bfa" : "2px solid transparent",
    background: active ? "rgba(124,58,237,0.14)" : hov ? "rgba(255,255,255,0.04)" : "transparent",
    transition: "background 0.12s",
    textDecoration: "none",
  };
  const inner = (
    <>
      <span style={{ width: 16, height: 16, flexShrink: 0, color: active ? "#a78bfa" : "rgba(255,255,255,0.3)" }}>
        {icon}
      </span>
      <span style={{ fontSize: 13, flex: 1, color: active ? "#c4b5fd" : "rgba(255,255,255,0.45)", fontWeight: active ? 500 : 400 }}>
        {label}
      </span>
      {hasArrow && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ color: "rgba(255,255,255,0.2)", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.18s", flexShrink: 0 }}>
          <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </>
  );
  if (to) return (
    <Link to={to} style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {inner}
    </Link>
  );
  return (
    <div style={base} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {inner}
    </div>
  );
}

// ── SubItem ───────────────────────────────────────────────────────────────────
function SubItem({ label, to, active }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 18px 7px 46px", cursor: "pointer", fontSize: 12,
        color: active ? "#a78bfa" : hov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.38)",
        fontWeight: active ? 500 : 400,
        background: hov ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background 0.1s",
      }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: active ? "#a78bfa" : "rgba(255,255,255,0.18)" }} />
        {label}
      </div>
    </Link>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SecLabel({ label }) {
  return (
    <div style={{ padding: "12px 18px 4px", fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {label}
    </div>
  );
}

// ── Module Card ───────────────────────────────────────────────────────────────
function ModCard({ m }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 12, padding: 16, cursor: "pointer",
        border: hov ? "1.5px solid #a78bfa" : "1.5px solid #ede9fe",
        position: "relative", overflow: "hidden",
        transform: hov ? "translateY(-2px)" : "none",
        transition: "border-color 0.15s, transform 0.15s",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "12px 12px 0 0", background: m.accent }} />
      <div style={{ width: 38, height: 38, borderRadius: 10, background: m.icoBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        {m.icon}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e", marginBottom: 4 }}>{m.title}</div>
      <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>{m.desc}</div>
      <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 20, marginTop: 10, background: m.tagBg, color: m.tagColor }}>
        {m.tag}
      </span>
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────────
function DashboardPage() {
  const stats = [
    {
      label: "Institutions", value: 12, color: "#7c3aed", bg: "#eeedfe",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2.5" stroke="#534ab7" strokeWidth="1.5"/><path d="M7 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#534ab7" strokeWidth="1.5"/></svg>,
    },
    {
      label: "Active users", value: 48, color: "#0d9488", bg: "#ccfbf1",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke="#0f766e" strokeWidth="1.5"/><path d="M3 17c0-3 2.5-5 5-5" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15" cy="13" r="2.5" stroke="#0f766e" strokeWidth="1.5"/><path d="M14 13h2M15 12v2" stroke="#0f766e" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    },
    {
      label: "ML jobs today", value: 7, color: "#d97706", bg: "#fef3c7",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l3.5-5 3 3 3-5.5 3.5 4" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
  ];

  const adminModules = [
    {
      title: "Institutions", desc: "Manage all registered institutes, addresses, logos and status.",
      tag: "Administration", tagBg: "#eeedfe", tagColor: "#534ab7",
      accent: "linear-gradient(90deg,#7c3aed,#a78bfa)", icoBg: "#eeedfe",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2.5" stroke="#534ab7" strokeWidth="1.5"/><path d="M7 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#534ab7" strokeWidth="1.5"/><path d="M5.5 10h9M5.5 13h6" stroke="#534ab7" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    },
    {
      title: "Users & roles", desc: "Create users, assign roles and manage platform permissions.",
      tag: "Administration", tagBg: "#fdf2f8", tagColor: "#9d174d",
      accent: "linear-gradient(90deg,#db2777,#f9a8d4)", icoBg: "#fdf2f8",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3.5" stroke="#9d174d" strokeWidth="1.5"/><path d="M2 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#9d174d" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
  ];

  const mlModules = [
    {
      title: "Face recognition", desc: "Real-time face detection and identity verification.",
      tag: "ML Module", tagBg: "#eff6ff", tagColor: "#1d4ed8",
      accent: "linear-gradient(90deg,#2563eb,#93c5fd)", icoBg: "#eff6ff",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="4" stroke="#1d4ed8" strokeWidth="1.5"/><path d="M2 18c0-3.3 2.7-6 6-6" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 13a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" stroke="#1d4ed8" strokeWidth="1.3"/><path d="M11.7 16.5l1 1 2-2" stroke="#1d4ed8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      title: "Sales & price prediction", desc: "Forecast revenue and pricing with ML models.",
      tag: "ML Module", tagBg: "#f0fdfa", tagColor: "#0f766e",
      accent: "linear-gradient(90deg,#0d9488,#5eead4)", icoBg: "#f0fdfa",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 13l4-5.5 3 3 3-6 4 4.5" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      title: "Time series", desc: "Detect patterns and forecast from sequential data.",
      tag: "ML Module", tagBg: "#fffbeb", tagColor: "#b45309",
      accent: "linear-gradient(90deg,#d97706,#fbbf24)", icoBg: "#fffbeb",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 15l3.5-5 3 2.5 3-6 3.5 4" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 17.5h15" stroke="#b45309" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 22, fontWeight: 600, color: "#1a1a2e", letterSpacing: "-0.02em", marginBottom: 4 }}>
        WELCOME, SHOEB👋
      </div>
      <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>
        Here's what's happening across your system today.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #ede9fe", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: s.color }}>{s.value}</div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Administration</span>
        <div style={{ flex: 1, height: 1, background: "#ede9fe" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginBottom: 28 }}>
        {adminModules.map(m => <ModCard key={m.title} m={m} />)}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>ML Modules</span>
        <div style={{ flex: 1, height: 1, background: "#ede9fe" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {mlModules.map(m => <ModCard key={m.title} m={m} />)}
      </div>
    </div>
  );
}

// ── Main Layout ───────────────────────────────────────────────────────────────
export default function Home() {
  const location = useLocation();
  const path = location.pathname;

  const [adminOpen, setAdminOpen] = useState(true);
  const [mlOpen, setMlOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Show dashboard only when exactly on /home
  const isDash = path === "/home";

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 235, minWidth: 235,
        background: "#13131f",
        display: "flex", flexDirection: "column",
        flexShrink: 0, height: "100vh",
        position: "relative", zIndex: 10,
      }}>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="11" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M6 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="white" strokeWidth="1.5"/>
              <path d="M5 8h8M5 11h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>AIS</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>AI Integrated System</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>

          <SecLabel label="Main" />
          {/* Dashboard links back to /home */}
          <NavItem icon={Ico.Dashboard} label="Dashboard" to="/home" active={isDash} />

          <SecLabel label="Administration" />
          <NavItem icon={Ico.Admin} label="Administration" hasArrow open={adminOpen}
            onClick={() => setAdminOpen(o => !o)} />
          <div style={{ maxHeight: adminOpen ? 200 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
            {/* IMPORTANT: relative paths — matches <Route path="institution"> inside /home */}
            <SubItem label="Institutions"        to="institution" active={path.includes("institution")} />
            <SubItem label="Users"               to="users"       active={path.includes("users")} />
            <SubItem label="Roles & permissions" to="roles"       active={path.includes("roles")} />
          </div>

          <SecLabel label="ML Modules" />
          <NavItem icon={Ico.ML} label="ML Modules" hasArrow open={mlOpen}
            onClick={() => setMlOpen(o => !o)} />
          <div style={{ maxHeight: mlOpen ? 200 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
            <SubItem label="Face recognition"         to="face"       active={path.includes("face")} />
            <SubItem label="Sales & price prediction" to="sales"      active={path.includes("sales")} />
            <SubItem label="Time series"              to="timeseries" active={path.includes("timeseries")} />
          </div>

          <SecLabel label="AI Tools" />
          <NavItem icon={Ico.Seg}  label="Segmentation" to="segmentation" active={path.includes("segmentation")} />
          <NavItem icon={Ico.QA}   label="Q&A module"   to="qa"           active={path.includes("qa")} />
          <NavItem icon={Ico.Chat} label="Chatbot"      to="chatbot"      active={path.includes("chatbot")} />
        </div>

        {/* User profile — bottom of sidebar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
          {userMenuOpen && (
            <div style={{
              position: "absolute", bottom: "calc(100% + 4px)", left: 14, right: 14,
              background: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, overflow: "hidden", zIndex: 20,
            }} onClick={e => e.stopPropagation()}>
              {[
                { label: "Profile",  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
                { label: "Settings", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
              ].map(item => (
                <div key={item.label}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", fontSize: 12, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {item.icon}{item.label}
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
              <div
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", fontSize: 12, color: "#f87171", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5M9.5 9.5L12 7l-2.5-2.5M12 7H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Log out
              </div>
            </div>
          )}

          <div
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", transition: "background 0.12s" }}
            onClick={() => setUserMenuOpen(o => !o)}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#fff", flexShrink: 0 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>Admin</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>Super admin</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
              <path d="M4 6l3-3 3 3M4 9l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Right content — full width, full height, same bg ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          background: "#f6f5ff",
          overflowY: "auto",
          padding: "28px 32px",
        }}
        onClick={() => setUserMenuOpen(false)}
      >
        {/* Show dashboard on /home, otherwise render matched child route */}
        {isDash ? <DashboardPage /> : <Outlet />}
      </div>

    </div>
  );
}