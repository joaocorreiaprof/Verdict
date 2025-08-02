import { useEffect, useState } from "react";
import GameCarousel from "../../components/Carousel/GameCarousel";
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
      <GameCarousel title="🎮 New Releases" items={newReleases} />
    </div>
  );
};

export default NewReleases;
