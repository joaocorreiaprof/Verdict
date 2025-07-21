import "./Home.css";

//dependencies
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../services/api";

//components
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";

interface TrendingItem {
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

const Home = () => {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrending();
        setItems(data.results);
      } catch (err) {
        console.error("Failed to load trending items", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="home">
      <Header />
      <Carousel title="🔥 Trending Movies" items={items} />
    </div>
  );
};

export default Home;
