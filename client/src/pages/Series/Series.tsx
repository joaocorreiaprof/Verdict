//styles
import "./Series.css";

//components
import Header from "../../components/Header/Header";
import TopRatedSeries from "../../components/Series/TopRatedSeries/TopRatedSeries";
import PopularSeries from "../../components/Series/PopularSeries/PopularSeries";

const Series = () => {
  return (
    <div id="series-page">
      <Header />
      <TopRatedSeries />
      <PopularSeries />
    </div>
  );
};
export default Series;
