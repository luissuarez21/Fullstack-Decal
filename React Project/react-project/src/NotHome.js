import React, { useState, useEffect } from "react";

function NotHome() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // if count goes below 0, reset to 0
    if (count < 0) {
      setCount(0);
    }
    // if count > 5, show message
    if (count > 5) {
      setMessage("You passed 5!");
    } else {
      setMessage("");
    }
  }, [count]); // run effect whenever count changes

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Website: NotHome</h1>
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button
          onClick={() => setCount(count - 1)}
          style={{ marginLeft: "10px" }}
        >
          Decrease
        </button>
      </div>
      {message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default NotHome;