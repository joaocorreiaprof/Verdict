//styles
import "./Series.css";

//components
import TopRatedSeries from "../../components/Series/TopRatedSeries/TopRatedSeries";
import PopularSeries from "../../components/Series/PopularSeries/PopularSeries";

const Series = () => {
  return (
    <div id="series-page">
      <TopRatedSeries />
      <PopularSeries />
    </div>
  );
};
export default Series;
