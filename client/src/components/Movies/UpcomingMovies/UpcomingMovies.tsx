//dependencies
import { useEffect, useState } from "react";

//services
import { getUpcomingMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface UpcomingMoviesItem {
  id: number;
  title?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const UpcomingMovies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMoviesItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<UpcomingMoviesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpcomingMovies();
        setUpcomingMovies(data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="upcoming-movies">
      <Carousel
        title="Upcoming Movies"
        items={upcomingMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as UpcomingMoviesItem);
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

export default UpcomingMovies;
