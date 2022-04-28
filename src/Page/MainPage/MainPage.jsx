import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import { api } from "../../service/endpoints";
import {
  fetchGenres,
  addPopularFilms,
  loadFavorites,
} from "../../store/action-creators/filmsActions";
import FilmCard from "../../components/FilmCard/FilmCard";
import Spinner from "../../components/Spinner/Spinner";
import UpArrows from "../../assets/img/UpArrows.png";
import loupe from "../../assets/img/loupe.png";
import multiply from "../../assets/img/multiply.png";

import "./MainPage.scss";

function MainPage() {
  const [filmsList, setFilmsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isShowScrollBtn, setIsShowScrollBtn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      api({
        method: "GET",
        url: `movie/popular?page=${currentPage}`,
      })
        .then((response) => {
          setFilmsList(() => [...filmsList, ...response.data.results]);
          dispatch(addPopularFilms(response.data));
          setCurrentPage((currentPage) => currentPage + 1);
          setTotalPage(response.data.total_pages);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites) {
      dispatch(loadFavorites(favorites));
    }
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    search(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (filmsList) {
      document.addEventListener("scroll", scrollHandler);
    }

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [filmsList]);

  const search = async (string) => {
    if (string) {
      api({
        method: "GET",
        url: `search/movie?&query=${string}&page=1`,
      })
        .then((response) => {
          setFilmsList(() => [...response.data.results]);
          dispatch(addPopularFilms(response.data));
          setCurrentPage((currentPage) => currentPage + 1);
          setTotalPage(response.data.total_pages);
        })
        .finally(() => setFetching(false));
    } else {
      setCurrentPage(1);
      api({
        method: "GET",
        url: `movie/popular`,
      })
        .then((response) => {
          setFilmsList(() => [...response.data.results]);
          dispatch(addPopularFilms(response.data));
          setCurrentPage((currentPage) => currentPage + 1);
          setTotalPage(response.data.total_pages);
        })
        .finally(() => setFetching(false));
    };
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      currentPage < totalPage
    ) {
      setFetching(true);
    }
    if (window.scrollY > 1200) {
      setIsShowScrollBtn(true);
    } else {
      setIsShowScrollBtn(false);
    }
  };
 
  return (
    <div className="mainPage">
      <Header />
      {filmsList.length ? (
        <div className="filmsBox" id="top">
          <div className="searchPanel">
            <input
              value={inputValue}
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter film..."
            />
            <img src={loupe} alt="loupe" className="loupe" />
            <img
              src={multiply}
              alt="clear_input_field"
              className="multiply"
              onClick={() => setInputValue("")}
            />
          </div>
          <div className="filmList">
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
                <FilmCard
                  key={id}
                  original_title={original_title}
                  overview={overview}
                  poster_path={poster_path}
                  original_language={original_language}
                  vote_average={vote_average}
                  genre_ids={genre_ids}
                  id={id}
                />
              )
            )}
          </div>
          {isShowScrollBtn ? (
            <>
              <img
                src={UpArrows}
                alt="go_to_up"
                className="scroll_btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MainPage;
