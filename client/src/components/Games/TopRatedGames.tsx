import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import GameModal from "../Modals/GamesModal";
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
  const [selectedGame, setSelectedGame] = useState<TopRatedGamesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <GameCarousel
        title="⭐ Top Rated Games"
        items={topRatedGames}
        onItemClick={(game) => {
          setSelectedGame(game as TopRatedGamesItem);
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

export default TopRatedGames;
