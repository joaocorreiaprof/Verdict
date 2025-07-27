import "./Home.css";

//components
import Header from "../../components/Header/Header";
import TrendingMovies from "../../components/Movies/TrendingMovies/TrendingMovies";
import DiscoverMovies from "../../components/Movies/DiscoverMovies/DiscoverMovies";
import PopularSeries from "../../components/Series/PopularSeries/PopularSeries";
import TopRatedSeries from "../../components/Series/TopRatedSeries/TopRatedSeries";

const Home = () => {
  return (
    <div id="home">
      <Header />
      <TrendingMovies />
      <DiscoverMovies />
      <TopRatedSeries />
      <PopularSeries />
    </div>
  );
};

export default Home;
