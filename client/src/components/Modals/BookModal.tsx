import { X } from "lucide-react";
import "./Modal.css";

interface Book {
  id: string;
  title: string;
  thumbnail?: string;
  averageRating?: number;
  description?: string;
}

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookModal = ({ isOpen, onClose, book }: BookModalProps) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        {book.thumbnail && (
          <img src={book.thumbnail} alt={book.title} className="modal-poster" />
        )}
        <h2 className="modal-title">{book.title}</h2>
        <p className="modal-rating">⭐ {book.averageRating}</p>
        <p className="modal-overview">
          {book.description || "Descrição não disponível..."}
        </p>
        <div className="modal-actions">
          <button className="btn-like">👍</button>
          <button className="btn-favorite">📌</button>
          <button className="btn-details">🔎</button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
