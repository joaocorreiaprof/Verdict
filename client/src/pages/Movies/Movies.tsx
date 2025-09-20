//styles
import "./Movies.css";

//components
import Header from "../../components/Header/Header";
import TrendingMovies from "../../components/Movies/TrendingMovies/TrendingMovies";
import DiscoverMovies from "../../components/Movies/DiscoverMovies/DiscoverMovies";
import PopularMovies from "../../components/Movies/PopularMovies/PopularMovies";
import TopRatedMovies from "../../components/Movies/TopRatedMovies/TopRatedMovies";
import UpcomingMovies from "../../components/Movies/UpcomingMovies/UpcomingMovies";
import NowPlayingMovies from "../../components/Movies/NowPlayingMovies/NowPlayingMovies";
import RandomTrendingMovie from "../../components/Movies/RandomTrendingMovie/RandomTrendingMovie";

const Movies = () => {
  return (
    <div id="movies-page">
      <Header />
      <RandomTrendingMovie />
      <TrendingMovies />
      <DiscoverMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <NowPlayingMovies />
    </div>
  );
};
export default Movies;
