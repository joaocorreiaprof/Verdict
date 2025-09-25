//styles
import "./Games.css";

//components
import TopGames from "../../components/Games/TopGames";
import NewReleases from "../../components/Games/NewReleases";
import UpcomingGames from "../../components/Games/UpcomingGames";
import TopRatedGames from "../../components/Games/TopRatedGames";

const Games = () => {
  return (
    <div id="games-page">
      <TopGames />
      <NewReleases />
      <UpcomingGames />
      <TopRatedGames />
    </div>
  );
};
export default Games;
