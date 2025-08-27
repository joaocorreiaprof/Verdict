import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
import GameModal from "../Modals/GamesModal";
import { getNewReleases } from "../../services/gamesServiceClient";

interface NewReleasesItem {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState<NewReleasesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<NewReleasesItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewReleases();
        setNewReleases(data.results);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="new-releases">
      <GameCarousel
        title="🎮 New Releases"
        items={newReleases}
        onItemClick={(game) => {
          setSelectedGame(game as NewReleasesItem);
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

export default NewReleases;
