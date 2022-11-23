import { useEffect, useState } from "react";
import { NavbarFooterIncluded, MovieContainer } from "layouts";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "services/api";
import { Carousel } from "components";

const Homepage = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();

  useEffect(() => {
    (async function () {
      const { results: populaMovieResults } = await getPopularMovies();
      const { results: topRatedMovieResults } = await getTopRatedMovies();
      const { results: upcomingMovieResults } = await getUpcomingMovies();

      populaMovieResults && setPopularMovies(populaMovieResults.slice(0, 10));
      upcomingMovieResults &&
        setUpcomingMovies(upcomingMovieResults.slice(0, 5));
      topRatedMovieResults &&
        setTopRatedMovies(topRatedMovieResults.slice(0, 10));
    })();
  }, []);

  return (
    <>
      <NavbarFooterIncluded>
        <Carousel moviesList={upcomingMovies} />
        <div className="pt-10">
          <MovieContainer
            sectionTitle="Upcoming Movies"
            moviesList={upcomingMovies}
            btnText="View All Upcoming Movies"
          />
          <MovieContainer
            sectionTitle="Popular Movies"
            moviesList={popularMovies}
            btnText="View All Upcoming Movies"
          />
          <MovieContainer
            sectionTitle="Top Rated Movies"
            moviesList={topRatedMovies}
            btnText="View All Top Rated Movies"
          />
        </div>
      </NavbarFooterIncluded>
    </>
  );
};

export default Homepage;
