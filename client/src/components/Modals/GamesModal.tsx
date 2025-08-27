import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./Modal.css";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface GameDetails extends Game {
  description_raw?: string;
}

interface GamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const GameModal = ({ isOpen, onClose, game }: GamesModalProps) => {
  const [details, setDetails] = useState<GameDetails | null>(null);

  useEffect(() => {
    if (isOpen && game) {
      document.body.style.overflow = "hidden";

      fetch(`/api/games/${game.id}`)
        .then((res) => res.json())
        .then((data) => setDetails(data));
    } else {
      document.body.style.overflow = "auto";
      setDetails(null);
    }
  }, [isOpen, game]);

  if (!isOpen || !game) return null;

  const imageUrl = game.background_image;
  const description = details?.description_raw || "Descrição não disponível...";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <img src={imageUrl} alt={game.name} className="modal-poster" />

        <h2 className="modal-title">{game.name}</h2>
        <p className="modal-rating">⭐ {game.rating.toFixed(1)}</p>
        <p className="modal-overview">{description}</p>

        <div className="modal-actions">
          <button className="btn-like">👍</button>
          <button className="btn-favorite">📌</button>
          <button className="btn-details">🔎</button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
