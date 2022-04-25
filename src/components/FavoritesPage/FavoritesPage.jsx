import "./FavoritesPage.scss";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FilmCard from "../FilmCard/FilmCard";
import { useEffect, useState } from "react";
import { loadFavorites } from "../../store/action-creators/filmsActions";
import { IMAGE_API_PATH } from "../../service/endpoints";
import like_add from "../../assets/img/like_add.png";
import like_added from "../../assets/img/like_added.png";

function FavoritesPage() {
  const [isAdded, setIsAdded] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  const genres = useSelector((state) => {
    return state.films.genres.genres;
  });
  // const getGenreName = (id) => {
  //   return genres.find((genre) => genre.id === id).name;
  // };
  useEffect(() => {
    let localStorageFilms = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteFilms(localStorageFilms);
  }, []);

  console.log(favoriteFilms);

  const removeFromFavorites = (id) => {
    let removedFilm = favoriteFilms.filter((film) => film.id !== id);
    localStorage.setItem("favorites", JSON.stringify(removedFilm));
    setFavoriteFilms(removedFilm);
  };

  return (
    <div className="favoritesPage">
      <Header />
      {favoriteFilms.length ? (
        <div className="favoriteFilmsBox">
          {favoriteFilms.map(
            ({ poster_path, original_title, id, vote_average, genre_ids }) => (
              <div className="favoriteCard" key={id}>
                <img
                  src={like_added}
                  alt="like_added"
                  className="added_img"
                  onClick={() => {
                    removeFromFavorites(id);
                  }}
                />
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
                      {/* {genre_ids.map((id) => (
                      <p key={id} className="genreBox_item">
                        {getGenreName(id)}
                      </p>
                    ))} */}
                    </div>
                  </div>
                </Link>
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
