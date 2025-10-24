import { useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel";
import { getFavoriteMovies } from "../../../services/trackedItemsServiceClient";
import MovieModal from "../../Modals/MovieModal";

interface MovieItem {
  id: number;
  title?: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFavorites = async () => {
    try {
      type FavoritesResponse = MovieItem[] | { results?: MovieItem[] };
      const data = (await getFavoriteMovies()) as FavoritesResponse;
      const items = Array.isArray(data) ? data : data.results ?? [];
      setFavorites(items);
    } catch (err) {
      console.error("Error fetching favorite movies", err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Listen for favorite toggles across the app
  useEffect(() => {
    const handleFavoriteEvent = (e: CustomEvent) => {
      const { movie, added } = e.detail;

      setFavorites((prev) => {
        if (added) {
          // Add only if not already present
          if (!prev.find((m) => m.id === movie.id)) {
            return [...prev, movie];
          }
        } else {
          // Remove if unfavorited
          return prev.filter((m) => m.id !== movie.id);
        }
        return prev;
      });
    };

    window.addEventListener(
      "favoriteToggled",
      handleFavoriteEvent as EventListener
    );
    return () => {
      window.removeEventListener(
        "favoriteToggled",
        handleFavoriteEvent as EventListener
      );
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="favorites">
      <Carousel
        title="Favorites"
        items={favorites}
        onItemClick={(movie) => {
          setSelectedMovie(movie as MovieItem);
          setIsModalOpen(true);
        }}
      />

      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={
          selectedMovie
            ? { ...selectedMovie, overview: selectedMovie.overview ?? "" }
            : null
        }
        onFavoriteToggle={(movieId) => {
          setFavorites((prev) => prev.filter((m) => m.id !== movieId));
        }}
      />
    </div>
  );
};

export default Favorites;
