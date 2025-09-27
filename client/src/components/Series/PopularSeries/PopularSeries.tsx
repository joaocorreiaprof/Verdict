//dependencies
import { useEffect, useState } from "react";

//services
import { getPopular } from "../../../services/seriesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface PopularSeriesItem {
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

const PopularSeries = () => {
  const [popularSeries, setPopularSeries] = useState<PopularSeriesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] =
    useState<PopularSeriesItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopular();
        setPopularSeries(data.results);
      } catch (error) {
        console.error("Error fetching popular series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="trending-movies">
      <Carousel
        title="Popular Series"
        items={popularSeries}
        onItemClick={(series) => {
          setSelectedSeries(series as PopularSeriesItem);
          setIsModalOpen(true);
        }}
      />
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedSeries}
      />
    </div>
  );
};

export default PopularSeries;
