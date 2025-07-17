import "./Home.css";

//dependencies
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../services/api";

//components
import Header from "../../components/Header/Header";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
      <button onClick={handleLogout}>Logout</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-3 rounded text-white shadow"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title || item.name}
              className="rounded"
            />
            <h2 className="mt-2 font-bold">{item.title || item.name}</h2>
            <p className="text-sm text-gray-300">⭐ {item.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
