//dependencies
import { useEffect, useState } from "react";

//services
import { getTopRated } from "../../../services/seriesServiceClient";

//components
import Carousel from "../../Carousel/Carousel";
import MovieModal from "../../Modals/MovieModal";

interface TopRatedSeriesItem {
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

const TopRatedSeries = () => {
  const [topRated, setTopRated] = useState<TopRatedSeriesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] =
    useState<TopRatedSeriesItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRated();
        setTopRated(data.results);
      } catch (error) {
        console.error("Error fetching top rated series:", error);
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
        title="👌 Top Rated Series"
        items={topRated}
        onItemClick={(series) => {
          setSelectedSeries(series as TopRatedSeriesItem);
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

export default TopRatedSeries;
