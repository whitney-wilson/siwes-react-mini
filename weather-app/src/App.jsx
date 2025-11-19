import { useState } from "react";

const API_KEY = "408f7c9f40fff7142d4a99f959720fbd"; // 👈 keep your real key here

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather() {
    if (!city.trim()) {
      setError("Please type a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("City not found. Try a different name.");
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }

      const data = await res.json();
      setWeather({
        name: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // pick an emoji based on temperature
  function getWeatherEmoji(temp) {
    if (temp >= 30) return "🥵";
    if (temp >= 22) return "🌞";
    if (temp >= 16) return "⛅️";
    if (temp >= 8) return "🌥";
    return "❄️";
  }

  // ====== styles ======
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #ff9a9e 0, #1e3c72 55%, #141414 100%)",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: 16,
    color: "#f9fafb",
  };

  const cardStyle = {
    background: "rgba(15, 23, 42, 0.9)",
    borderRadius: 24,
    padding: "24px 28px 28px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 22px 45px rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(14px)",
  };

  const headerRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const appTitle = {
    margin: 0,
    fontSize: "1.6rem",
    letterSpacing: "0.03em",
  };

  const smallText = {
    marginTop: 6,
    fontSize: "0.88rem",
    opacity: 0.8,
  };

  const emojiBubble = {
    width: 52,
    height: 52,
    borderRadius: "999px",
    background: "rgba(148, 163, 184, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
  };

  const inputRowStyle = {
    display: "flex",
    gap: 10,
    marginTop: 20,
    marginBottom: 16,
  };

  const inputStyle = {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 999,
    border: "none",
    outline: "none",
    fontSize: "0.95rem",
    background: "rgba(15, 23, 42, 0.9)",
    color: "#e5e7eb",
    boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.6)",
  };

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    background: loading ? "#4ade80aa" : "#4ade80",
    color: "#022c22",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: loading ? "default" : "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    boxShadow: loading ? "none" : "0 8px 16px rgba(74, 222, 128, 0.35)",
  };

  const errorStyle = {
    color: "#fecaca",
    marginTop: 4,
    fontSize: "0.88rem",
  };

  const cityNameStyle = {
    marginTop: 10,
    marginBottom: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
  };

  const tempStyle = {
    fontSize: "3.3rem",
    fontWeight: 700,
    margin: "4px 0",
  };

  const descriptionStyle = {
    marginTop: 0,
    textTransform: "capitalize",
    fontSize: "1rem",
    opacity: 0.9,
  };

  const extraStyle = {
    marginTop: 10,
    fontSize: "0.9rem",
    opacity: 0.9,
  };

  const hintStyle = {
    marginTop: 12,
    fontSize: "0.85rem",
    opacity: 0.75,
  };

  // ====== JSX ======
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerRow}>
          <div>
            <h1 style={appTitle}>Weather App</h1>
            <p style={smallText}>Type a city to check the current weather.</p>
          </div>
          <div style={emojiBubble}>
            {weather ? getWeatherEmoji(weather.temp) : "🌍"}
          </div>
        </div>

        <div style={inputRowStyle}>
          <input
            style={inputStyle}
            placeholder="e.g. Lagos, London, Accra"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            style={buttonStyle}
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        {weather && (
          <>
            <h2 style={cityNameStyle}>
              {weather.name}, {weather.country}
            </h2>
            <p style={tempStyle}>{weather.temp}°C</p>
            <p style={descriptionStyle}>{weather.description}</p>
            <p style={extraStyle}>
              Feels like: {weather.feelsLike}°C • Humidity: {weather.humidity}%
            </p>
          </>
        )}

        {!weather && !error && !loading && (
          <p style={hintStyle}>
            Tip: Try cities like <strong>Lagos</strong>, <strong>Abuja</strong>,{" "}
            <strong>London</strong>, or <strong>New York</strong>.
          </p>
        )}
      </div>
    </div>
  );
}