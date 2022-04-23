import { Link } from "react-router-dom";
import "./MainPage.scss";
import Header from "../Header/Header";

import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteFilmAction,
  fetchGenres,
  fetchPopularFilms,
} from "../../store/action-creators/filmsActions";

import { useEffect } from "react";
import FilmCard from "../FilmCard/FilmCard";

function MainPage() {
  const dispatch = useDispatch();
  const filmsData = useSelector((state) => {
    return state.films;
  });

  const { films, genres } = filmsData;

  useEffect(() => {
    dispatch(fetchPopularFilms());
    dispatch(fetchGenres());
  }, [dispatch]);


  // console.log(films, genres);

  return (
    <div className="mainPage">
      <Header />
      {films !== null ? (
        <div className="filmBox">
          {films.results.map(
            ({
              id,
              original_title,
              overview,
              poster_path,
              original_language,
              vote_average,
              genre_ids,
            }) => (
              <Link key={id} to={`/film/${id}`} className="card_link">
                <FilmCard
                  original_title={original_title}
                  overview={overview}
                  poster_path={poster_path}
                  original_language={original_language}
                  vote_average={vote_average}
                  genre_ids={genre_ids}
                />
              </Link>
            )
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default MainPage;
