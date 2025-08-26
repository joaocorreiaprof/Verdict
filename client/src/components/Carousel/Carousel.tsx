import React, { useRef } from "react";
import "./Carousel.css";

interface CarouselItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  onItemClick?: (item: CarouselItem) => void; // Add this line
}

const Carousel: React.FC<CarouselProps> = ({ title, items, onItemClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = current.offsetWidth * 0.8;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="home-carousel-section">
      <h2 className="home-carousel-title">{title}</h2>

      <div className="home-carousel-wrapper">
        <button
          className="home-carousel-arrow home-carousel-left"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          ◀
        </button>

        <div className="home-carousel-container" ref={scrollRef}>
          {items.map((item) => (
            <div
              key={item.id}
              className="home-carousel-item"
              onClick={() => onItemClick && onItemClick(item)} // Add this line
              style={{ cursor: onItemClick ? "pointer" : "default" }} // Optional: show pointer
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="home-carousel-image"
              />
              <h3 className="home-carousel-item-title">
                {item.title || item.name}
              </h3>
              <p className="home-carousel-rating">⭐ {item.vote_average}</p>
            </div>
          ))}
        </div>

        <button
          className="home-carousel-arrow home-carousel-right"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Carousel;
