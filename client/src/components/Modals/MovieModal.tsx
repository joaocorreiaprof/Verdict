//Dependencies
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//style
import "./Modal.css";
import { X } from "lucide-react";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faCheckCircle,
  faClock,
  faTrashAlt,
  faMagnifyingGlass,
  faFilm,
  faSpinner,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

//Services
import { getMovieVideos } from "../../services/moviesServiceClient";
import {
  toggleFavorite,
  toggleSeen,
  getTrackedStatus,
  toggleToSee,
} from "../../services/trackedItemsServiceClient";

//Map
import { genresMap } from "../../genresMap/genresMap";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    media_type?: string;
    genre_ids?: number[];
  } | null;
  trailerUrl?: string | null;
}

interface Video {
  key: string;
  type: string;
  site: string;
}

const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  onClose,
  movie,
  trailerUrl: externalTrailerUrl,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isToSee, setIsToSee] = useState(false);
  const navigate = useNavigate();

  const getItemType = (media_type?: string) => {
    if (!media_type) return "MOVIE";
    if (media_type.toLowerCase() === "tv") return "SERIES";
    return media_type.toUpperCase();
  };

  useEffect(() => {
    if (isOpen && movie) {
      document.body.style.overflow = "hidden";
      setTrailerUrl(externalTrailerUrl || null);

      const fetchStatus = async () => {
        const status = await getTrackedStatus({
          itemId: String(movie.id),
          itemType: getItemType(movie.media_type),
        });
        setIsFavorite(status.favorite);
        setIsSeen(status.seen);
        setIsToSee(status.toSee || false);
      };

      fetchStatus();
    } else {
      document.body.style.overflow = "auto";
      setTrailerUrl(null);
    }
  }, [isOpen, movie, externalTrailerUrl]);

  const handleToggleFavorite = async (): Promise<void> => {
    if (!movie) return;
    await toggleFavorite({
      itemId: String(movie.id),
      itemType: getItemType(movie.media_type),
    });
    setIsFavorite((prev) => !prev);
  };

  const handleToggleSeen = async (): Promise<void> => {
    if (!movie) return;
    await toggleSeen({
      itemId: String(movie.id),
      itemType: getItemType(movie.media_type),
    });
    setIsSeen((prev) => !prev);
  };

  const handleToggleToSee = async (): Promise<void> => {
    if (!movie) return;
    await toggleToSee({
      itemId: String(movie.id),
      itemType: getItemType(movie.media_type),
    });
    setIsToSee((prev) => !prev);
  };

  const handleShowTrailer = useCallback(async (): Promise<void> => {
    if (!movie) return;
    setLoadingTrailer(true);
    try {
      const mediaType = movie.media_type || "movie";
      const videos: Video[] = await getMovieVideos(movie.id, mediaType);
      const trailer = videos.find(
        (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl(null);
        alert("Trailer not available.");
      }
    } catch {
      setTrailerUrl(null);
      alert("Failed to load trailer.");
    }
    setLoadingTrailer(false);
  }, [movie]);

  const handleShowDetails = () => {
    if (!movie) return;
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  if (!isOpen || !movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {trailerUrl ? (
          <div className="modal-trailer-wrapper">
            <iframe
              width="100%"
              height="315"
              src={trailerUrl}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <img
              src={imageUrl}
              alt={movie.title || movie.name}
              className="modal-poster"
            />
            <h2 className="modal-title">{movie.title || movie.name}</h2>
            <p className="modal-genres">
              {movie.genre_ids?.map((id: number) => genresMap[id]).join(" ")}
            </p>
            <p className="modal-rating">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "gold", marginRight: 4 }}
              />
              {movie.vote_average.toFixed(1)}
            </p>
            <p className="modal-overview">{movie.overview}</p>

            <div className="modal-actions">
              <div className="modal-actions-row">
                <button className="btn-like" onClick={handleToggleSeen}>
                  <span>
                    <FontAwesomeIcon
                      icon={isSeen ? faCheckCircle : faEye}
                      style={{
                        color: isSeen ? "#4caf50" : "#fff",
                        opacity: isSeen ? 1 : 0.8,
                      }}
                    />
                  </span>
                  <p>{isSeen ? "Seen" : "Not Seen"}</p>
                </button>
                <button className="btn-favorite" onClick={handleToggleFavorite}>
                  <span>
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        color: isFavorite ? "#eb0000" : "#fff",
                        opacity: isFavorite ? 1 : 0.5,
                      }}
                    />
                  </span>
                  <p>{isFavorite ? "Favorite" : "Add"}</p>
                </button>
                <button className="btn-watchlater" onClick={handleToggleToSee}>
                  <span>
                    <FontAwesomeIcon
                      icon={isToSee ? faTrashAlt : faClock}
                      style={{
                        color: isToSee ? "#e50914" : "#fff",
                        opacity: isToSee ? 1 : 0.8,
                      }}
                    />
                  </span>
                  <p>{isToSee ? "Remove" : "See Later"}</p>
                </button>
              </div>
              <div className="modal-actions-row">
                <button className="btn-details" onClick={handleShowDetails}>
                  <span>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                  <p>View Page</p>
                </button>
                <button
                  className="btn-trailer"
                  onClick={handleShowTrailer}
                  disabled={loadingTrailer}
                >
                  <span>
                    <FontAwesomeIcon
                      icon={loadingTrailer ? faSpinner : faFilm}
                      spin={loadingTrailer}
                    />
                  </span>
                  <p>{loadingTrailer ? "Loading..." : "Trailer"}</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
