//styles
import "./Movies.css";

//components
import TrendingMovies from "../../components/Movies/TrendingMovies/TrendingMovies";
import DiscoverMovies from "../../components/Movies/DiscoverMovies/DiscoverMovies";
import PopularMovies from "../../components/Movies/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/Movies/TopRatedMovies/TopRatedMovies";
import UpcomingMovies from "../../components/Movies/UpcomingMovies/UpcomingMovies";
import NowPlayingMovies from "../../components/Movies/NowPlayingMovies/NowPlayingMovies";
import RandomTrendingMovie from "../../components/Movies/RandomTrendingMovie/RandomTrendingMovie";
import PopularComedy from "../../components/Movies/PopularComedy/PopularComedy";

const Movies = () => {
  return (
    <div id="movies-page">
      <RandomTrendingMovie />
      <TrendingMovies />
      <DiscoverMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <NowPlayingMovies />
      <PopularComedy />
    </div>
  );
};
export default Movies;
