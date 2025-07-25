import "./TrendingMovies.css";

//dependencies
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../../services/api";

//components
import Carousel from "../../Carousel/Carousel";
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

  if (loading) return <p>Loading...</p>;

  return (
    <div id="trending-movies">
      <Carousel title="🔥 Trending Movies" items={trendingMovies} />
    </div>
  );
};

export default TrendingMovies;
