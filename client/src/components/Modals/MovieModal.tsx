import { useEffect } from "react";
import { X } from "lucide-react"; // ícone de fechar
import "./MovieModal.css";

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
  } | null;
}

const MovieModal = ({ isOpen, onClose, movie }: MovieModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // trava scroll no background
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botão Fechar */}
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Poster + Detalhes */}
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="modal-poster"
        />

        <h2 className="modal-title">{movie.title || movie.name}</h2>
        <p className="modal-rating">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="modal-overview">{movie.overview}</p>

        <div className="modal-actions">
          <button className="btn-like">👍</button>
          <button className="btn-favorite">📌</button>
          <button className="btn-details">🔎</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
