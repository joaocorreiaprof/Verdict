//Dependencies
import { useEffect, useState, useCallback } from "react";

//Styles
import "./Modal.css";
import { ArrowBigLeft } from "lucide-react";

//Services
import { getMovieVideos } from "../../services/moviesServiceClient";
import {
  toggleFavorite,
  toggleSeen,
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

const MovieModal = ({
  isOpen,
  onClose,
  movie,
  trailerUrl: externalTrailerUrl,
}: MovieModalProps) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTrailerUrl(externalTrailerUrl || null);
    } else {
      document.body.style.overflow = "auto";
      setTrailerUrl(null);
    }
  }, [isOpen, externalTrailerUrl]);

  const handleToggleFavorite = async () => {
    if (!movie) return;
    await toggleFavorite({
      itemId: String(movie.id),
      itemType: movie.media_type?.toUpperCase() || "MOVIE",
    });
  };

  const handleToggleSeen = async () => {
    if (!movie) return;
    await toggleSeen({
      itemId: String(movie.id),
      itemType: movie.media_type?.toUpperCase() || "MOVIE",
    });
  };

  const handleShowTrailer = useCallback(async () => {
    if (!movie) return;
    setLoadingTrailer(true);
    try {
      const mediaType = movie.media_type || "movie";
      const videos = await getMovieVideos(movie.id, mediaType);
      interface Video {
        key: string;
        type: string;
        site: string;
      }
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

  if (!isOpen || !movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <ArrowBigLeft size={24} />
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
              {movie.genre_ids?.map((id) => genresMap[id]).join(" ")}
            </p>
            <p className="modal-rating">⭐ {movie.vote_average.toFixed(1)}</p>
            <p className="modal-overview">{movie.overview}</p>
            <div className="modal-actions">
              <button className="btn-like" onClick={handleToggleSeen}>
                👀
              </button>
              <button className="btn-favorite" onClick={handleToggleFavorite}>
                📌
              </button>
              <button className="btn-details">🔎</button>
              <button
                className="btn-trailer"
                onClick={handleShowTrailer}
                disabled={loadingTrailer}
              >
                {loadingTrailer ? "Loading..." : "Trailer"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
