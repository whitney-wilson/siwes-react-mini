// src/App.jsx
import { useState } from "react";
import Clock from "./components/Clock";

export default function App() {
  const [name, setName] = useState("Whitney");

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif" }}>
      <header style={{ padding: 20 }}>
        <h1 style={{ margin: 0 }}>React Intro</h1>
        <div style={{ marginTop: 10 }}>
          <label style={{ marginRight: 8 }}>Your name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name…"
            style={{ padding: 8, width: 260 }}
          />
        </div>
      </header>

      <main style={{ padding: 20 }}>
        <p>Hello, {name}!</p>
        <Clock />
      </main>
    </div>
  );
}