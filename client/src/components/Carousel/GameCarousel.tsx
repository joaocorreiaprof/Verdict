import React, { useRef } from "react";
import "./Carousel.css"; // Reuse the same CSS

interface GameCarouselItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface GameCarouselProps {
  title: string;
  items: GameCarouselItem[];
}

const GameCarousel: React.FC<GameCarouselProps> = ({ title, items }) => {
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

  // Convert RAWG rating (0-5) to match TMDB's (0-10) scale
  const convertRating = (rating: number) => (rating * 2).toFixed(1);

  return (
    <div className="home-carousel-section">
      <h2 className="home-carousel-title">{title}</h2>
      <div className="home-carousel-wrapper">
        <button
          className="home-carousel-arrow home-carousel-left"
          onClick={() => scroll("left")}
        >
          ◀
        </button>
        <div className="home-carousel-container" ref={scrollRef}>
          {items.map((item) => (
            <div key={item.id} className="home-carousel-item">
              <div className="game-image-container">
                <img
                  src={item.background_image || "/placeholder-game.png"}
                  alt={item.name}
                  className="home-carousel-image"
                />
              </div>
              <h3 className="home-carousel-item-title">{item.name}</h3>
              <p className="home-carousel-rating">
                ⭐ {convertRating(item.rating)}
              </p>
            </div>
          ))}
        </div>
        <button
          className="home-carousel-arrow home-carousel-right"
          onClick={() => scroll("right")}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default GameCarousel;
