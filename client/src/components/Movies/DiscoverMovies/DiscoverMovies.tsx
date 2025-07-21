import "./TrendingMovies.css";

//dependencies
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../../services/api";

//components
import Carousel from "../../Carousel/Carousel";

interface DiscoverMoviesItem {
  id: number;
  title?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}

//NOT WORKING PROBABLY BECAUSE IF PUSHING TRENDING MOVIES
//need to change api.ts and do the backend for this
const DiscoverMovies = () => {
  const [discoverMovies, setDiscoverMovies] = useState<DiscoverMoviesItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrending();
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
      <Carousel title="🎬 Discover Movies" items={discoverMovies} />
    </div>
  );
};

export default DiscoverMovies;
