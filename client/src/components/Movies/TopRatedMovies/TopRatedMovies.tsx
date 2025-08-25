//dependencies
import { useEffect, useState } from "react";

//services
import { getTopRatedMovies } from "../../../services/moviesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";

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
      <Carousel title="⭐ Top Rated Movies" items={topRatedMovies} />
    </div>
  );
};

export default TopRatedMovies;
