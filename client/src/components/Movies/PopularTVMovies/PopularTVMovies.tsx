import { useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel";
import { getRecentPopularTVMovies } from "../../../services/moviesServiceClient";
import MovieModal from "../../Modals/MovieModal";

interface MovieItem {
  id: number;
  name?: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  first_air_date?: string;
}
const PopularTVMovies = () => {
  const [tvMovies, setTVMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentPopularTVMovies();
        setTVMovies((data && data.results) ?? data ?? []);
      } catch (err) {
        console.error("Error fetching popular TV movies:", err);
        setTVMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div id="popular-tv-movies">
      <Carousel
        title="Recent Popular TV Movies"
        items={tvMovies}
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
export default PopularTVMovies;
