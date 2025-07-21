import "./Logout.css";

//Dependencies
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
