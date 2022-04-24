import React, { useState, useEffect } from "react";
import {
  getFilmOfDescription,
  getRecommendedFilms,
} from "../../service/endpoints";
import { Link } from "react-router-dom";
import { IMAGE_API_PATH } from "../../service/endpoints";
import FilmCard from "../FilmCard/FilmCard";
import Header from "../Header/Header";
import "./FilmPage.scss";

function FilmPage() {
  const [film, setFilm] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [idOfFilm, setIdOfFilm] = useState(null);

  const filmOfDescription = async (id) => {
    const film = await getFilmOfDescription(id);
    setFilm(film);
  };

  const recommendedFilms = async (id) => {
    const recommended = await getRecommendedFilms(id);
    setRecommended(recommended);
  };

  useEffect(() => {
    setIdOfFilm(window.location.pathname.split("/")[2]);
  }, []);

  useEffect(() => {
    if (idOfFilm) {
      filmOfDescription(idOfFilm);
      recommendedFilms(idOfFilm);
    }
  }, [idOfFilm]);

  return (
    <div className="filmPage">
      <Header />
      {film && idOfFilm && recommended ? (
        <>
          <div className="filmOfDescriptionBox">
            <div className="imgBox">
              <img
                className="filmPage_img"
                src={`${IMAGE_API_PATH}${film.poster_path}`}
                alt={film.title}
              />
            </div>
            <div className="descriptionBox">
              <h1 className="filmTitle">{film.title}</h1>
              <span>{film.tagline} </span>
              <span>{film.production_countries[0].name}</span>
              <span>Runtime: {film.runtime}</span>
              <span>
                Genre:
                {film.genres.map(({ name }) => (
                  <span key={name}> {name}</span>
                ))}
              </span>
              <span>Release:{film.release_date}</span>
              <span>Rating: {film.vote_count}</span>
              <span>{film.overview}</span>
            </div>
          </div>
          <div className="recommendedBox">
            <p>Recommendations:</p>
            <div className="recommendedBox_list">
              {recommended.results.map(
                ({
                  id,
                  original_title,
                  overview,
                  poster_path,
                  original_language,
                  vote_average,
                  genre_ids,
                }) => (
                  <Link
                    key={id}
                    to={`/film/${id}`}
                    className="card_link"
                    onClick={() => setIdOfFilm(id)}
                  >
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
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default FilmPage;
