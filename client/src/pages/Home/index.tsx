import "./Home.css";

//components
import Header from "../../components/Header/Header";
import TrendingMovies from "../../components/Movies/TrendingMovies/TrendingMovies";
import DiscoverMovies from "../../components/Movies/DiscoverMovies/DiscoverMovies";

const Home = () => {
  return (
    <div id="home">
      <Header />
      <TrendingMovies />
      <DiscoverMovies />
    </div>
  );
};

export default Home;
