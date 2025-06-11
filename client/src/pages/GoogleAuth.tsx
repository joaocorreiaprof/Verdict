import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, location.search]);

  return <div>Autenticando...</div>;
};

export default GoogleAuth;
