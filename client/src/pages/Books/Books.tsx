//styles
import "./Books.css";

//components
import Header from "../../components/Header/Header";
import TopRatedBooks from "../../components/Books/TopRatedBooks";
import NewReleasesBooks from "../../components/Books/NewReleasesBooks";

const Books = () => {
  return (
    <div id="books-page">
      <Header />
      <TopRatedBooks />
      <NewReleasesBooks />
    </div>
  );
};
export default Books;
