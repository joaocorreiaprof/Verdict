//style
import "./InfoMovie.css";

//dependencies
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const InfoMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="info-movie">
      <button className="back-button" onClick={handleGoBack}>
        <ArrowLeft size={20} />
        Back
      </button>

      <h2>Movie Info</h2>
      <p>ID: {id}</p>
      <p>Title: {movie?.title || movie?.name || "No title available"}</p>
    </div>
  );
};

export default InfoMovie;
