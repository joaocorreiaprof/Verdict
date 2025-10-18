//dependencies
import { useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel";
import { getRecentPopularComedyMovies } from "../../../services/moviesServiceClient";
import MovieModal from "../../Modals/MovieModal";

interface MovieItem {
  id: number;
  title?: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const PopularComedy = () => {
  const [comedyMovies, setComedyMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentPopularComedyMovies();
        setComedyMovies((data && data.results) ?? data ?? []);
      } catch (err) {
        console.error("Error fetching popular comedy movies:", err);
        setComedyMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="popular-comedy">
      <Carousel
        title="Recent Popular Comedy"
        items={comedyMovies}
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

export default PopularComedy;
