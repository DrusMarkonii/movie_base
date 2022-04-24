import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./FilmCard.scss";
import { IMAGE_API_PATH } from "../../service/endpoints";
import React from "react";
import { addFavoriteFilmAction } from "../../store/action-creators/filmsActions";
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

  const dispatch = useDispatch();

  const getGenreName = (id) => {
    return genres.find((genre) => genre.id === id).name;
  };

  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.find((film) => film.id === id)) {
      setIsAdded(true);
    }
  }, []);

  const addToFavorites = (id) => {
    setIsAdded(!isAdded);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push({
      poster_path,
      original_title,
      id,
      vote_average,
      genre_ids,
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeToFavorites = (id) => {
    setIsAdded(!isAdded);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
              removeToFavorites(id);
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
