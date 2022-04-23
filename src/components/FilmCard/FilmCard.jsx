import { useSelector } from "react-redux";
import "./FilmCard.scss";
import { IMAGE_API_PATH } from "../../service/endpoints";
import React from "react";

function FilmCard({
  poster_path,
  original_title,
  original_language,
  vote_average,
  genre_ids,
}) {
  const genres = useSelector((state) => {
    return state.films.genres.genres;
  });

  const getGenreName = (id) => {
    return genres.find((genre) => genre.id === id).name;
  };

  if (genre_ids !== null && genres) {
    return (
      <div className="filmCard">
        <div>
          <img
            className="card_img"
            src={`${IMAGE_API_PATH}${poster_path}`}
            alt={original_title}
          />
        </div>
        <div className="description_box">
          <span className="description_title">{original_title}</span>
          <span>Rating: {vote_average}</span>
          <div className="genreBox">
            {genre_ids.map((id) => (
              <p key={id} className="genreBox_item">{getGenreName(id)}</p>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default FilmCard;
