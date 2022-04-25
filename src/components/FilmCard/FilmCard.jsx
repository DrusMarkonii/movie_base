import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./FilmCard.scss";
import { IMAGE_API_PATH } from "../../service/endpoints";
import React from "react";
import {
  addToFavoritesAction,
  removeFromFavoritesAction,
} from "../../store/action-creators/filmsActions";
import like_add from "../../assets/img/like_add.png";
import like_added from "../../assets/img/like_added.png";

function FilmCard({
  poster_path,
  original_title,
  id,
  vote_average,
  genre_ids,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const genres = useSelector((state) => {
    return state.films.genres.genres;
  });
  const getGenreName = (id) => {
    return genres.find((genre) => genre.id === id).name;
  };
  const favoriteFilms = useSelector((state) => {
    return state.films.favoriteFilms;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    if (favoriteFilms.find((film) => film.id === id)) {
      setIsAdded(true);
    }
    // console.log(favoriteFilms);
  }, []);

  const addToFavorites = (id) => {
    setIsAdded(!isAdded);
    const film = { poster_path, original_title, id, vote_average, genre_ids };
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(addToFavoritesAction(film));
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
        {isAdded ? (
          <img
            src={like_added}
            alt="like_added"
            className="added_img"
            onClick={() => {
              removeFromFavorites(id)
            }}
          />
        ) : (
          <img
            src={like_add}
            alt="like_add"
            className="add_img"
            onClick={() => {
              addToFavorites(id);
            }}
          />
        )}
        <Link key={id} to={`/film/${id}`} className="card_link">
          <div>
            <img
              className="card_img"
              src={`${IMAGE_API_PATH}${poster_path}`}
              alt={original_title}
              onClick={() => setIsAdded(!isAdded)}
            />
          </div>
          <div className="description_box">
            <span className="description_title">{original_title}</span>
            <span>Rating: {vote_average}</span>
            <div className="genreBox">
              {genre_ids.map((id) => (
                <p key={id} className="genreBox_item">
                  {getGenreName(id)}
                </p>
              ))}
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return null;
  }
}

export default FilmCard;
