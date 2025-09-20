//dependencies
import { useState, useEffect } from "react";

//services
import { getRandomTrendingMovie } from "../../../services/moviesServiceClient";
import MovieModal from "../../Modals/MovieModal"; // importe o modal

//style
import "./RandomTrendinMovie.css";

interface RandomTrendingMovieItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

const RandomTrendingMovie = () => {
  const [movie, setMovie] = useState<RandomTrendingMovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getRandomTrendingMovie();
        setMovie(data);
      } catch {
        setMovie(null);
      }
    };
    fetchMovie();
  }, []);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="random-movie-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="random-movie"
      />
      <div className="random-movie-options">
        <button>
          <div>➕</div>
          <div>Add</div>
        </button>
        <button>
          <div>🎬</div>
          <div>Trailer</div>
        </button>
        <button onClick={() => setIsModalOpen(true)}>
          <div>🛈</div>
          <div>Info</div>
        </button>
      </div>
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={movie}
      />
    </div>
  );
};

export default RandomTrendingMovie;
