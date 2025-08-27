import React, { useRef } from "react";
import "./GameCarousel.css";

interface GameCarouselItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface GameCarouselProps {
  title: string;
  items: GameCarouselItem[];
  onItemClick?: (item: GameCarouselItem) => void; // Add this line
}

const GameCarousel: React.FC<GameCarouselProps> = ({
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

  const convertRating = (rating: number) => (rating * 2).toFixed(1);

  return (
    <div className="game-carousel-section">
      <h2 className="game-carousel-title">{title}</h2>
      <div className="game-carousel-wrapper">
        <button
          className="game-carousel-arrow game-carousel-left"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          ◀
        </button>
        <div className="game-carousel-container" ref={scrollRef}>
          {items.map((item) => (
            <div
              key={item.id}
              className="game-carousel-item"
              onClick={() => onItemClick && onItemClick(item)} // Add this line
              style={{ cursor: onItemClick ? "pointer" : "default" }} // Optional
            >
              <div className="game-carousel-image-wrapper">
                <img
                  src={item.background_image || "/placeholder-game.png"}
                  alt={item.name}
                  className="game-carousel-image"
                />
              </div>
              <h3 className="game-carousel-item-title">{item.name}</h3>
              <p className="game-carousel-rating">
                ⭐ {convertRating(item.rating)}
              </p>
            </div>
          ))}
        </div>
        <button
          className="game-carousel-arrow game-carousel-right"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default GameCarousel;
