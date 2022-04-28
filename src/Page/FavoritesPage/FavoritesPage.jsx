import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import { IMAGE_API_PATH } from "../../service/endpoints";
import feature_true from "../../assets/img/feature_true.png";

import "./FavoritesPage.scss";

function FavoritesPage() {
  const [isAdded, setIsAdded] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  useEffect(() => {
    let localStorageFilms = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteFilms(localStorageFilms);
  }, []);

  const removeFromFavorites = (id) => {
    let newFavoriteList = favoriteFilms.filter((film) => film.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavoriteList));
    setFavoriteFilms(newFavoriteList);
  };

  return (
    <div className="favoritesPage">
      <Header />
      {favoriteFilms.length ? (
        <div className="favoriteFilms">
          {favoriteFilms.map(
            ({ poster_path, original_title, id, vote_average }) => (
              <div className="favoriteCard" key={id}>
                <Link
                  key={id}
                  to={`/film/${id}`}
                  className="favoriteCard_link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    className="favoriteCard_img"
                    src={`${IMAGE_API_PATH}${poster_path}`}
                    alt={original_title}
                    onClick={() => setIsAdded(!isAdded)}
                  />
                  <div className="favoriteCard_description_box">
                    <span className="favoriteCard_description_title">
                      {original_title}
                    </span>
                    <img
                      src={feature_true}
                      alt="rate"
                      className="rateBtn"
                    />
                    <span className="favoriteCard_description_rate">
                      {vote_average}
                    </span>
                  </div>
                </Link>
                <div className="favoriteCard_favorites">
                  <img
                    src={feature_true}
                    alt="feature_true"
                    className="favoriteCard__feature_true"
                    onClick={() => {
                      removeFromFavorites(id);
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="favorites_message">
          You can add the movie to your favorites...
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
