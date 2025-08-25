import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
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
      <GameCarousel title="⏳ Upcoming Games" items={upcomingGames} />
    </div>
  );
};

export default UpcomingGames;
