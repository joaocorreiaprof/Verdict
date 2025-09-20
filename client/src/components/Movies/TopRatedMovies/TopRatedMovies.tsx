//dependencies
import { useEffect, useState } from "react";

//services
import { getTopRatedMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface TopRatedMoviesItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const TopRatedMovies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<TopRatedMoviesItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TopRatedMoviesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRatedMovies();
        setTopRatedMovies(data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="top-rated-movies">
      <Carousel
        title="Top Rated Movies"
        items={topRatedMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as TopRatedMoviesItem);
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

export default TopRatedMovies;
