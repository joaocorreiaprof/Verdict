//dependencies
import { useEffect, useState } from "react";

//services
import { getPopularMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface PopularMoviesItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMoviesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<PopularMoviesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovies();
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="popular-movies">
      <Carousel
        title="Popular Movies"
        items={popularMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as PopularMoviesItem);
          setIsModalOpen(true);
        }}
      />
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default PopularMovies;
