//dependencies
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//style
import "./index.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page-bg">
      <header className="login-header">
        <button onClick={() => navigate("/")} className="header-title">
          Verdict
        </button>
      </header>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h3 className="login-title">Sign In</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <button
            type="button"
            className="login-btn"
            style={{
              background: "#fff",
              color: "#444",
              border: "1px solid #e50914",
              marginTop: "0.5rem",
            }}
            onClick={() => {
              window.location.href = "/api/auth/google";
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              style={{
                width: 20,
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Sign in with Google
          </button>
          {error && <p className="login-error">{error}</p>}
          <div className="login-signup-link">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="login-link-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
