import { useState } from "react";
//styles
import "./index.css";

// images
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
      <section id="landing-section-two">
        <h1>TOP Trends</h1>
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
      <section>{/*Section for a carrousel with top movies*/}</section>
      <section>{/*Section for a carrousel with top series*/}</section>
      <section>{/*Section for a carrousel with top games*/}</section>
      <section>{/*Section for a carrousel with top books*/}</section>
    </div>
  );
};

export default PublicLandingPage;
