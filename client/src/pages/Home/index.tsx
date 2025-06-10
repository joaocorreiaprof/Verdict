import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div id="home">
      <p>Congrats</p>
      <p>You are authenticated</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
