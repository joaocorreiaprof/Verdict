import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Error fetching data"));
  }, []);

  return (
    <div className="App">
      <h1>Server Message</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
