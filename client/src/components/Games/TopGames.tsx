import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import { getTopGames } from "../../services/gamesServiceClient";

interface TopGamesItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const TopGames = () => {
  const [topGames, setTopGames] = useState<TopGamesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopGames();
        setTopGames(data.results);
      } catch (error) {
        console.error("Error fetching top games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="top-games">
      <GameCarousel title="🎮 Top Rated Games" items={topGames} />
    </div>
  );
};

export default TopGames;
