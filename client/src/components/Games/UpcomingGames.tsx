import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import GameModal from "../Modals/GamesModal";
import { getUpcomingGames } from "../../services/gamesServiceClient";

interface UpcomingGameItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const UpcomingGames = () => {
  const [upcomingGames, setUpcomingGames] = useState<UpcomingGameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<UpcomingGameItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpcomingGames();
        setUpcomingGames(data.results);
      } catch (error) {
        console.error("Error fetching upcoming games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="upcoming-games">
      <GameCarousel
        title="⏳ Upcoming Games"
        items={upcomingGames}
        onItemClick={(game) => {
          setSelectedGame(game as UpcomingGameItem);
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

export default UpcomingGames;
