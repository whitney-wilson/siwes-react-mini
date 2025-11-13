import React, { useState, useEffect } from "react";

export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isDark = theme === "dark";

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: 32,
    position: "relative",
  };

  const cardStyle = {
    background: isDark ? "#171b22" : "#ffffff",
    borderRadius: 12,
    padding: "16px 24px",
    minWidth: 260,
    color: isDark ? "#ffffff" : "#111827",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    transition: "background 0.2s ease, color 0.2s ease",
  };

  const titleStyle = {
    margin: 0,
    marginBottom: 8,
    fontSize: "1.05rem",
    fontWeight: 600,
  };

  const timeStyle = {
    margin: 0,
    fontSize: "1.9rem",
    fontWeight: 700,
    letterSpacing: "1px",
  };

  const dateStyle = {
    marginTop: 8,
    fontSize: "0.95rem",
    opacity: 0.9,
  };

  const buttonStyle = {
    position: "absolute",
    top: -36,
    right: 0,
    padding: "6px 12px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.08)",
    background: isDark ? "#0f1724" : "#f3f4f6",
    color: isDark ? "#f9fafb" : "#111827",
    fontSize: "0.85rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <div style={wrapperStyle}>
      <button
        type="button"
        aria-pressed={isDark}
        style={buttonStyle}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Current Time</h2>
        <p style={timeStyle}>{time}</p>
        <p style={dateStyle}>{date}</p>
      </div>
    </div>
  );
}