//styles
import "./Header.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Buttons/Logout/Logout";

const Header: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleSidebarClose = () => {
    setClosing(true);
    setTimeout(() => {
      setSidebarOpen(false);
      setClosing(false);
    }, 200); // match animation duration
  };

  const getTitle = () => {
    if (location.pathname.includes("home")) return "Homepage";
    if (location.pathname.includes("movies")) return "Movies";
    if (location.pathname.includes("series")) return "Series";
    if (location.pathname.includes("games")) return "Games";
    if (location.pathname.includes("books")) return "Books";
  };

  return (
    <>
      <header id="header">
        <h2 className="header-title">Verdict</h2>
        <h3>{getTitle()}</h3>
        <button onClick={() => setSidebarOpen(true)}>☰</button>
      </header>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleSidebarClose}>
          <nav
            className={`sidebar${closing ? " closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleSidebarClose}>
              ×
            </button>
            <ul>
              <li>
                <Link to="/home" onClick={handleSidebarClose}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" onClick={handleSidebarClose}>
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/series" onClick={handleSidebarClose}>
                  Series
                </Link>
              </li>
              <li>
                <Link to="/books" onClick={handleSidebarClose}>
                  Books
                </Link>
              </li>
              <li>
                <Link to="/games" onClick={handleSidebarClose}>
                  Games
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
