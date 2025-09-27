import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import GameModal from "../Modals/GamesModal";
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
  const [selectedGame, setSelectedGame] = useState<TopGamesItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <GameCarousel
        title="Top Rated Games"
        items={topGames}
        onItemClick={(game) => {
          setSelectedGame(game as TopGamesItem);
          setIsModalOpen(true);
        }}
      />
      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game={selectedGame}
      />
    </div>
  );
};

export default TopGames;
