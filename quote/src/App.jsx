import { useState, useEffect } from "react";

// Local fallback quotes so the app works offline or if the API fails
const QUOTES = [
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
];

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchQuote() {
    setLoading(true);
    setError("");

    // Try remote API first (Quotable). Fallback to local quotes on any failure.
    try {
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("Remote API responded with an error");
      const data = await res.json();
      // Quotable returns { content, author }
      if (data && data.content) {
        setQuote(data.content);
        setAuthor(data.author || "Unknown");
        setLoading(false);
        return;
      }
      throw new Error("Invalid data from API");
    } catch (err) {
      // fallback to local quote
      const { text, author: a } = getRandomQuote();
      setQuote(text);
      setAuthor(a);
      // keep error message minimal for UI but log for debugging
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Styles =====
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #6366f1 0, #0f172a 50%, #020617 100%)",
    fontFamily: "system-ui, Arial, sans-serif",
    padding: 16,
    color: "#e5e7eb",
  };

  const cardStyle = {
    background: "rgba(15, 23, 42, 0.9)",
    borderRadius: 24,
    padding: "24px 28px 28px",
    maxWidth: 520,
    width: "100%",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    backdropFilter: "blur(16px)",
  };

  const titleStyle = { margin: 0, fontSize: "1.6rem", marginBottom: 6 };
  const subtitleStyle = { margin: 0, fontSize: "0.9rem", opacity: 0.8 };
  const quoteTextStyle = { marginTop: 18, fontSize: "1.2rem", lineHeight: 1.6, fontStyle: "italic" };
  const authorStyle = { marginTop: 12, fontSize: "1rem", fontWeight: 500, textAlign: "right", opacity: 0.9 };
  const errorStyle = { marginTop: 10, color: "#fecaca", fontSize: "0.9rem" };
  const buttonRowStyle = { marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 };
  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    background: loading ? "#22c55eaa" : "#22c55e",
    color: "#022c22",
    fontWeight: 700,
    cursor: loading ? "default" : "pointer",
    fontSize: "0.9rem",
  };
  const hintStyle = { fontSize: "0.8rem", opacity: 0.7 };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Quote App</h1>
        <p style={subtitleStyle}>Get a random inspirational quote. Click the button for a new one.</p>

        <p style={quoteTextStyle}>{loading ? "Loading quote..." : quote || "No quote yet."}</p>
        {author && !loading && <p style={authorStyle}>— {author}</p>}
        {error && <p style={errorStyle}>Using local quote (API error: {error})</p>}

        <div style={buttonRowStyle}>
          <button
            style={buttonStyle}
            onClick={fetchQuote}
            disabled={loading}
            aria-busy={loading}
            type="button"
          >
            {loading ? "Getting quote..." : "New Quote"}
          </button>
          <span style={hintStyle}>Tries remote API (quotable.io) then falls back to local quotes</span>
        </div>
      </div>
    </div>
  );
}