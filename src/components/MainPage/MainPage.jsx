import { useEffect, useState } from "react";
import { API_KEY } from "../../service/endpoints";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import Header from "../Header/Header";

import { useDispatch } from "react-redux";
import {
  fetchGenres,
  fetchPopularFilms,
  addScrollLoadedFilmsAction,
} from "../../store/action-creators/filmsActions";

import FilmCard from "../FilmCard/FilmCard";
import axios from "axios";

function MainPage() {
  const [filmsList, setFilmsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalPage, setTotalPage] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularFilms());
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
        .then((response) => {
          setFilmsList([...filmsList, ...response.data.results]);
          dispatch(addScrollLoadedFilmsAction(response.data));
          setCurrentPage((currentPage) => currentPage + 1);
          setTotalPage(response.data.total_pages)
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    if (filmsList) {
      document.addEventListener("scroll", scrollHandler);
    }

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

 

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100 && currentPage > totalPage
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="mainPage">
      <Header />
      {filmsList ? (
        <div className="filmsBox">
          {filmsList.map(
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
