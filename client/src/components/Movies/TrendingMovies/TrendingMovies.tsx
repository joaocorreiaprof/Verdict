import "./TrendingMovies.css";

//dependencies
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import Loading from "../../Loading/Loading";
import MovieModal from "../../Modals/MovieModal";

interface TrendingMoviesItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMoviesItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TrendingMoviesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrending();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div id="trending-movies">
      <Carousel
        title="Trending Movies"
        items={trendingMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as TrendingMoviesItem);
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

export default TrendingMovies;
