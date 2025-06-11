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
          <button
            type="button"
            className="google-btn"
            onClick={() => {
              window.location.href = "/api/auth/google";
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 48 48"
              style={{ marginRight: 10 }}
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M44.5 20H24v8.5h11.7C34.1 33.6 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"
                />
                <path
                  fill="#34A853"
                  d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2C29.2 35.9 26.7 36.8 24 36.8c-5.6 0-10.1-3.4-11.7-8.3l-7 5.4C10.7 41.1 16.8 44 24 44z"
                />
                <path
                  fill="#EA4335"
                  d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.7 0-5.2-.9-7.2-2.4l-6.4 6.4C13.9 42.9 18.7 45 24 45c7.2 0 13.3-4.1 16.7-10.1z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Sign up with Google
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
