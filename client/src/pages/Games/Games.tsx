//styles
import "./Games.css";

//components
import Header from "../../components/Header/Header";
import TopGames from "../../components/Games/TopGames";
import NewReleases from "../../components/Games/NewReleases";
import UpcomingGames from "../../components/Games/UpcomingGames";
import TopRatedGames from "../../components/Games/TopRatedGames";

const Games = () => {
  return (
    <div id="games-page">
      <Header />
      <TopGames />
      <NewReleases />
      <UpcomingGames />
      <TopRatedGames />
    </div>
  );
};
export default Games;
