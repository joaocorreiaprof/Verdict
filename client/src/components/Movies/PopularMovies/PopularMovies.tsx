//dependencies
import { useEffect, useState } from "react";

//services
import { getPopularMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";

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
      <Carousel title="🔥 Popular Movies" items={popularMovies} />
    </div>
  );
};

export default PopularMovies;
