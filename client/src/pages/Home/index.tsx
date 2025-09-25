import "./Home.css";

//components
import TrendingMovies from "../../components/Movies/TrendingMovies/TrendingMovies";
import DiscoverMovies from "../../components/Movies/DiscoverMovies/DiscoverMovies";
import PopularSeries from "../../components/Series/PopularSeries/PopularSeries";
import TopRatedSeries from "../../components/Series/TopRatedSeries/TopRatedSeries";
import TopGames from "../../components/Games/TopGames";
import NewReleases from "../../components/Games/NewReleases";
import TopRatedBooks from "../../components/Books/TopRatedBooks";
import NewReleasesBooks from "../../components/Books/NewReleasesBooks";

const Home = () => {
  return (
    <div id="home">
      <TrendingMovies />
      <DiscoverMovies />
      <TopRatedSeries />
      <PopularSeries />
      <TopGames />
      <NewReleases />
      <TopRatedBooks />
      <NewReleasesBooks />
    </div>
  );
};

export default Home;
