import { useEffect, useState } from "react";
import Carousel from "../../Carousel/Carousel";
import { getRecentPopularFamilyMovies } from "../../../services/moviesServiceClient";
import MovieModal from "../../Modals/MovieModal";

interface MovieItem {
  id: number;
  title?: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
}
const PopularFamily = () => {
  const [familyMovies, setFamilyMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecentPopularFamilyMovies();
        setFamilyMovies((data && data.results) ?? data ?? []);
      } catch (err) {
        console.error("Error fetching popular family movies:", err);
        setFamilyMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div id="popular-family">
      <Carousel
        title="Recent Popular Family"
        items={familyMovies}
        onItemClick={(movie) => {
          setSelectedMovie(movie as MovieItem);
          setIsModalOpen(true);
        }}
      />
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={
          selectedMovie
            ? { ...selectedMovie, overview: selectedMovie.overview ?? "" }
            : null
        }
      />
    </div>
  );
};

export default PopularFamily;
