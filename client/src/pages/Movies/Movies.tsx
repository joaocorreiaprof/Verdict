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
import PopularAction from "../../components/Movies/PopularAction/PopularAction";
import PopularAdventure from "../../components/Movies/PopularAdventure/PopularAdventure";
import PopularAnimation from "../../components/Movies/PopularAnimation/PopularAnimation";

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
      <PopularAction />
      <PopularAdventure />
      <PopularAnimation />
    </div>
  );
};
export default Movies;
