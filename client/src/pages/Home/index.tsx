import "./Home.css";

//dependencies
import { useNavigate } from "react-router-dom";

//components
import Header from "../../components/Header/Header";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div id="home">
      <Header />
      <p>Congrats</p>
      <p>You are authenticated</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
