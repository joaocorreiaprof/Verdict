import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("/api/auth/signup", { username, email, password });
      setSuccess("Signup successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Signup failed. Please check your details and try again."
        );
      } else {
        setError("Signup failed. Please check your details and try again.");
      }
    }
  };

  return (
    <div className="signup-page-bg">
      <header className="signup-header">
        <button onClick={() => navigate("/")} className="header-title">
          Verdict
        </button>
      </header>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h3 className="signup-title">Create Account</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          {error && <p className="signup-error">{error}</p>}
          {success && <p className="signup-success">{success}</p>}
          <div className="signup-login-link">
            <span>Already have an account?</span>
            <button
              type="button"
              className="signup-link-btn"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
