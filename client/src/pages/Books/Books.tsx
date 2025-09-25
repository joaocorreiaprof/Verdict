//styles
import "./Books.css";

//components
import TopRatedBooks from "../../components/Books/TopRatedBooks";
import NewReleasesBooks from "../../components/Books/NewReleasesBooks";

const Books = () => {
  return (
    <div id="books-page">
      <TopRatedBooks />
      <NewReleasesBooks />
    </div>
  );
};
export default Books;
