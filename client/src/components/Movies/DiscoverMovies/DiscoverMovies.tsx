//dependencies
import { useEffect, useState } from "react";

//services
import { getDiscover } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface DiscoverMoviesItem {
  id: number;
  title?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const DiscoverMovies = () => {
  const [discoverMovies, setDiscoverMovies] = useState<DiscoverMoviesItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<DiscoverMoviesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDiscover();
        setDiscoverMovies(data.results);
      } catch (error) {
        console.error("Error fetching discover movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="discover-movies">
      <Carousel
        title="🎬 Discover Movies"
        items={discoverMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as DiscoverMoviesItem);
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

export default DiscoverMovies;
