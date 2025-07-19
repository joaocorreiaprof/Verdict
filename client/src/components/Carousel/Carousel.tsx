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
}

const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
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
    <div className="carousel-section">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-wrapper">
        <button
          className="carousel-arrow left"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          ◀
        </button>

        <div className="carousel-container" ref={scrollRef}>
          {items.map((item) => (
            <div key={item.id} className="carousel-item">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="carousel-image"
              />
              <h3 className="carousel-item-title">{item.title || item.name}</h3>
              <p className="carousel-rating">⭐ {item.vote_average}</p>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow right"
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
