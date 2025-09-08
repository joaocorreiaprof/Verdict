// src/components/BooksCarousel/BooksCarousel.tsx
import React, { useRef } from "react";
import "./BookCarousel.css";

interface BookItem {
  id: string;
  title: string;
  thumbnail?: string;
  averageRating?: number;
}

interface BooksCarouselProps {
  title: string;
  items: BookItem[];
  onItemClick?: (book: BookItem) => void;
}

const BooksCarousel: React.FC<BooksCarouselProps> = ({
  title,
  items,
  onItemClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = current.offsetWidth * 0.8;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="books-carousel-section">
      <h2 className="books-carousel-title">{title}</h2>
      <div className="books-carousel-wrapper">
        <button
          className="books-carousel-arrow books-carousel-left"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          ◀
        </button>
        <div className="books-carousel-container" ref={scrollRef}>
          {items.map((book) => (
            <div
              key={book.id}
              className="books-carousel-item"
              onClick={() => onItemClick?.(book)}
              style={{ cursor: "pointer" }}
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="books-carousel-image"
                />
              )}
              <h3 className="books-carousel-item-title">{book.title}</h3>
              <p className="books-carousel-rating">⭐ {book.averageRating}</p>
            </div>
          ))}
        </div>
        <button
          className="books-carousel-arrow books-carousel-right"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default BooksCarousel;
