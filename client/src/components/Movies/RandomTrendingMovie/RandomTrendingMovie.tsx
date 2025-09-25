//dependencies
import { useState, useEffect } from "react";

//services
import {
  getRandomTrendingMovie,
  getMovieVideos,
} from "../../../services/moviesServiceClient";

//components
import MovieModal from "../../Modals/MovieModal";

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
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

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

  interface MovieVideo {
    key: string;
    site: string;
    type: string;
  }

  const handleTrailerClick = async () => {
    if (!movie) return;
    try {
      const videos: MovieVideo[] = await getMovieVideos(
        movie.id,
        movie.media_type
      );
      const trailer = videos.find(
        (vid: MovieVideo) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setIsModalOpen(true);
      } else {
        alert("No trailer available");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

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
        <button onClick={handleTrailerClick}>
          <div>🎬</div>
          <div>Trailer</div>
        </button>
        <button
          onClick={() => {
            setTrailerUrl(null);
            setIsModalOpen(true);
          }}
        >
          <div>🛈</div>
          <div>Info</div>
        </button>
      </div>
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTrailerUrl(null);
        }}
        movie={movie}
        trailerUrl={trailerUrl}
      />
    </div>
  );
};

export default RandomTrendingMovie;
