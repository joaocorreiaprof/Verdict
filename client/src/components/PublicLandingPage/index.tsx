//Dependencies
import { useState } from "react";

//styles
import "./index.css";

// people images
import jk from "../../assets/images/people/jk.jpg";
import joel from "../../assets/images/people/joel.jpg";
import keanu from "../../assets/images/people/keanu.jpg";
import king from "../../assets/images/people/king.jpg";
import kojima from "../../assets/images/people/kojima.jpg";
import kratos from "../../assets/images/people/Kratos.jpg";
import merylStreep from "../../assets/images/people/Meryl Streep.jpg";
import mf from "../../assets/images/people/mf.jpg";
import morgan from "../../assets/images/people/morgan.jpg";
import robin from "../../assets/images/people/robin.jpg";
import jake from "../../assets/images/people/jake.jpg";
import emma from "../../assets/images/people/emma.jpg";

//icons
import movie from "../../assets/images/icons/movie.png";
import discover from "../../assets/images/icons/discover.png";
import list from "../../assets/images/icons/list.png";
import continueMovie from "../../assets/images/icons/continue.png";
import favourites from "../../assets/images/icons/favourites.png";
import stats from "../../assets/images/icons/stats.png";

//videos
import moviesVideo from "../../assets/videos/landingpagemovie.mp4";

const PublicLandingPage = () => {
  type Person = {
    name: string;
    photo: string;
  };

  const people: Record<string, Person> = {
    jk: { name: "J.K. Rowling", photo: jk },
    joel: { name: "Joel", photo: joel },
    keanu: { name: "Keanu Reeves", photo: keanu },
    king: { name: "Stephen King", photo: king },
    kojima: { name: "Hideo Kojima", photo: kojima },
    kratos: { name: "Kratos", photo: kratos },
    merylStreep: { name: "Meryl Streep", photo: merylStreep },
    mf: { name: "Morgan Freeman", photo: mf },
    morgan: { name: "Arthur Morgan", photo: morgan },
    robin: { name: "Robin Williams", photo: robin },
    jake: { name: "Jake Gyllenhaal", photo: jake },
    emma: { name: "Emma Stone", photo: emma },
  };

  const peopleArray = Object.values(people);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      peopleArray.length <= 3 || prevIndex + 3 >= peopleArray.length
        ? 0
        : prevIndex + 3
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      peopleArray.length <= 3 || prevIndex - 3 < 0
        ? peopleArray.length - 3
        : prevIndex - 3
    );
  };

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

      <section id="landing-section-one">
        <p className="landing-section-one-primary-text">
          Track what you’ve seen. Plan what’s next.
        </p>
        <p className="landing-section-one-secondary-text">
          All your favorite movies, series, games and books in one place.
        </p>
      </section>
      <section id="landing-sections">
        <h1 className="landing-sections-title">Top 12 Cultural Icons</h1>
        <div className="carousel">
          <button className="carousel-arrow left" onClick={handlePrev}>
            &#8249;
          </button>
          <div className="carousel-items">
            {peopleArray
              .slice(currentIndex, currentIndex + 3)
              .map((person, index) => (
                <div key={index} className="carousel-item">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="carousel-image"
                  />
                </div>
              ))}
          </div>
          <button className="carousel-arrow right" onClick={handleNext}>
            &#8250;
          </button>
        </div>
      </section>

      <section id="landing-sections">
        <h1 className="landing-sections-title">The Best Movies and Series</h1>
        <video
          src={moviesVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "auto", marginTop: "15px" }}
        />
        <div className="section-about-test">
          <h3 className="section-about-title">Your Personal Watch Companion</h3>
          <p className="section-about-description">
            From 'Next Episode' to 'Just Finished,' we’ve got your binge
            sessions covered.
          </p>
          <div className="section-about-icon-container">
            <img
              src={movie}
              alt="Happy user tracking their favorite series"
              className="landing-sections-icon"
            />
          </div>
        </div>
        <div className="section-about">
          <h3>Discover new movies and series</h3>
          <p>
            Get personalized recommendations based on what you love to watch
          </p>
          <img src={discover} alt="Discovery illustration" />
        </div>
        <div className="section-about">
          <h3>Create your perfect watchlists</h3>
          <p>Organize by genre, mood, or create your ultimate binge list</p>
          <img src={list} alt="Watchlist illustration" />
        </div>
        <div className="section-about">
          <h3>Pick up right where you left</h3>
          <p>We'll remember your progress across all your devices</p>
          <img src={continueMovie} alt="Progress tracking illustration" />
        </div>
        <div className="section-about">
          <h3>Share your favorites</h3>
          <p>Recommend shows to friends and see what they're watching</p>
          <img src={favourites} alt="Social sharing illustration" />
        </div>
        <div className="section-about">
          <h3>Advanced Stats & Insights</h3>
          <p>See your viewing habits, time spent, and favorite genres</p>
          <img src={stats} alt="Statistics illustration" />
        </div>
      </section>
      <section>{/*Section for a carrousel with top series*/}</section>
      <section>{/*Section for a carrousel with top games*/}</section>
      <section>{/*Section for a carrousel with top books*/}</section>
      <section>{/*FAQ*/}</section>
    </div>
  );
};

export default PublicLandingPage;
