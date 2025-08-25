import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import { getTopRatedGames } from "../../services/gamesServiceClient";

interface TopRatedGamesItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const TopRatedGames = () => {
  const [topRatedGames, setTopRatedGames] = useState<TopRatedGamesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRatedGames();
        setTopRatedGames(data.results);
      } catch (error) {
        console.error("Error fetching top rated games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="top-rated-games">
      <GameCarousel title="⭐ Top Rated Games" items={topRatedGames} />
    </div>
  );
};

export default TopRatedGames;
