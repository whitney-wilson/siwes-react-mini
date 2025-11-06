import { useState } from "react";
import Greeting from "./Greeting";
import Counter from "./Counter";

export default function App() {
  const [name, setName] = useState("Whitney");

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>React Intro</h1>

      <Greeting name={name} />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name…"
        style={{ padding: 8, marginTop: 10, width: 240 }}
      />

      <Counter />
    </div>
  );
}
