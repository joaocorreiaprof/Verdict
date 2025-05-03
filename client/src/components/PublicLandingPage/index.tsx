//styles
import "./index.css";

//images
import frontImage from "../../assets/images/landingpageimagetwo.jpg";

const PublicLandingPage = () => {
  return (
    <div id="public-landing-page">
      <header>
        <div className="header-left">
          <h2 className="header-title">Verdict</h2>
        </div>
        <div className="header-right">
          <button className="header-sign-in-btn">Sign In</button>
        </div>
      </header>
      <section>
        <img
          src={frontImage}
          alt="Person library"
          className="person-library-image"
        />
        <div>
          <p>Track what you’ve seen. Plan what’s next.</p>
          <p>All your favorite movies, series, games and books in one place.</p>
          <p>Enter your email to get started.</p>
        </div>
      </section>
      <section>{/*Section for a carrousel with top movies*/}</section>
      <section>{/*Section for a carrousel with top series*/}</section>
      <section>{/*Section for a carrousel with top games*/}</section>
      <section>{/*Section for a carrousel with top books*/}</section>
    </div>
  );
};
export default PublicLandingPage;
