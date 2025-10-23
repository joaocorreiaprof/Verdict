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
import PopularCrime from "../../components/Movies/PopularCrime/PopularCrime";
import PopularDocumentary from "../../components/Movies/PopularDocumentary/PopularDocumentary";
import PopularDrama from "../../components/Movies/PopularDrama/PopularDrama";
import PopularFamily from "../../components/Movies/PopularFamily/PopularFamily";
import PopularFantasy from "../../components/Movies/PopularFantasy/PopularFantasy";
import PopularHistory from "../../components/Movies/PopularHistory/PopularHistory";
import PopularHorror from "../../components/Movies/PopularHorror/PopularHorror";
import PopularMusic from "../../components/Movies/PopularMusic/PopularMusic";
import PopularMystery from "../../components/Movies/PopularMystery/PopularMystery";
import PopularRomance from "../../components/Movies/PopularRomance/PopularRomance";
import PopularSciFi from "../../components/Movies/PopularSciFi/PopularSciFi";
import PopularThriller from "../../components/Movies/PopularThriller/PopularThriller";
import PopularTVMovies from "../../components/Movies/PopularTVMovies/PopularTVMovies";
import PopularWar from "../../components/Movies/PopularWar/PopularWar";
import PopularWestern from "../../components/Movies/PopularWestern/PopularWestern";

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
      <PopularCrime />
      <PopularDocumentary />
      <PopularDrama />
      <PopularFamily />
      <PopularFantasy />
      <PopularHistory />
      <PopularHorror />
      <PopularMusic />
      <PopularMystery />
      <PopularRomance />
      <PopularSciFi />
      <PopularThriller />
      <PopularTVMovies />
      <PopularWar />
      <PopularWestern />
    </div>
  );
};
export default Movies;
