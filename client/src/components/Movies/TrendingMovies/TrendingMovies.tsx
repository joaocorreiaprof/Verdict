import "./TrendingMovies.css";

//dependencies
import { useEffect, useState } from "react";

//services
import { getTrending } from "../../../services/api";

//components
import Carousel from "../../Carousel/Carousel";

interface TrendingMoviesItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMoviesItem[]>(
    []
  );
};
