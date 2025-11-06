import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // remember a number

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)} style={{ margin: "0 8px" }}>
        Reset
      </button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
