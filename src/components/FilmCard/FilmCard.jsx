import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IMAGE_API_PATH } from "../../service/endpoints";
import {
  addToFavoritesAction,
  removeFromFavoritesAction,
} from "../../store/action-creators/filmsActions";
import feature_false from "../../assets/img/feature_false.png";
import feature_true from "../../assets/img/feature_true.png";

import "./FilmCard.scss";

function FilmCard({
  poster_path,
  original_title,
  id,
  vote_average,
  genre_ids,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  const genres = useSelector((state) => {
    return state.films.genres.genres;
  });

  useEffect(() => {
    if (favoriteFilms.find((film) => film.id === id)) {
      setIsAdded(true);
    }
  }, []);


  const getGenreName = (id) => {
    return genres.find((genre) => genre.id === id).name;
  };

  const favoriteFilms = useSelector((state) => {
    return state.films.favoriteFilms;
  });

  const addToFavorites = (id) => {
    setIsAdded(!isAdded);
    const film = { poster_path, original_title, id, vote_average, genre_ids };
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // dispatch(addToFavoritesAction(film));
    favorites.push(film);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFromFavorites = (id) => {
    setIsAdded(!isAdded);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(removeFromFavoritesAction(id));
    favorites = favorites.filter((film) => film.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (genre_ids !== null && genres) {
    return (
      <div className="filmCard">
        <Link
          key={id}
          to={`/film/${id}`}
          className="filmCard_card_link"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="filmCard_card_img"
            src={`${IMAGE_API_PATH}${poster_path}`}
            alt={original_title}
            onClick={() => setIsAdded(!isAdded)}
          />
          <div className="filmCard_description_box">
            <span className="filmCard_description_title">{original_title}</span>
            <img
              src={feature_true}
              alt="rate"
              width={15}
              style={{ marginLeft: 10 }}
            />
            <span className="filmCard_description_rate">{vote_average}</span>
            <div className="filmCard_genreBox">
              {genre_ids.map((id) => (
                <p key={id} className="filmCard_genreBox_item">
                  {getGenreName(id)}
                </p>
              ))}
            </div>
          </div>
        </Link>
        <div className="filmCard_favorites">
          {isAdded ? (
            <img
              src={feature_true}
              alt="feature_true"
              className="feature_true"
              onClick={() => {
                removeFromFavorites(id);
              }}
            />
          ) : (
            <img
              src={feature_false}
              alt="feature_false"
              className="feature_false"
              onClick={() => {
                addToFavorites(id);
              }}
            />
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default FilmCard;
