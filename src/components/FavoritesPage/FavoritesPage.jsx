import "./FavoritesPage.scss";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenres } from "../../store/action-creators/filmsActions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGE_API_PATH } from "../../service/endpoints";
import feature_false from "../../assets/img/feature_false.png";
import feature_true from "../../assets/img/feature_true.png";
import Spinner from "../Spinner/Spinner";

function FavoritesPage() {
  const [isAdded, setIsAdded] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    let localStorageFilms = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteFilms(localStorageFilms);
    setIsLoaded(() => true);
  }, []);

  const removeFromFavorites = (id) => {
    let removedFilm = favoriteFilms.filter((film) => film.id !== id);
    localStorage.setItem("favorites", JSON.stringify(removedFilm));
    setFavoriteFilms(removedFilm);
  };

  return (
    <div className="favoritesPage">
      <Header />
      
      {favoriteFilms ? (
        <div className="favoriteFilms">
          {favoriteFilms.map(
            ({ poster_path, original_title, id, vote_average, genre_ids }) => (
              <div className="favoriteCard" key={id}>
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
                    <span className="filmCard_description_title">
                      {original_title}
                    </span>
                    <img
                      src={feature_true}
                      alt="rate"
                      width={15}
                      style={{ marginLeft: 10 }}
                    />
                    <span className="filmCard_description_rate">
                      {vote_average}
                    </span>
                  </div>
                </Link>
                <div className="filmCard_favorites">
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
        <div>You can add the movie to your favorites...</div>
      )}
    </div>
  );
}

export default FavoritesPage;
