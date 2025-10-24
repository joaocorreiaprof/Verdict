import { useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel";
import { getWatchlistMovies } from "../../../services/trackedItemsServiceClient";
import MovieModal from "../../Modals/MovieModal";

interface MovieItem {
  id: number;
  title?: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatchlistMovies();
        // handle either an array (direct list) or an object with `results`
        interface WatchlistResults {
          results?: MovieItem[];
        }
        const items = Array.isArray(data)
          ? (data as MovieItem[])
          : (data as WatchlistResults)?.results ?? [];
        setWatchlistMovies(items);
      } catch (err) {
        console.error("Error fetching the watchlist movies", err);
        setWatchlistMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div id="watchlist">
      <Carousel
        title="Watchlist"
        items={watchlistMovies}
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
      />
    </div>
  );
};

export default Watchlist;
