//dependencies
import { useEffect, useState } from "react";

//services
import { getNowPlayingMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface NowPlayingMoviesItem {
  id: number;
  title?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

const NowPlayingMovies = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<
    NowPlayingMoviesItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] =
    useState<NowPlayingMoviesItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNowPlayingMovies();
        setNowPlayingMovies(data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="now-playing-movies">
      <Carousel
        title="Now Playing Movies"
        items={nowPlayingMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as NowPlayingMoviesItem);
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

export default NowPlayingMovies;
