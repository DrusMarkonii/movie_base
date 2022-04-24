import "./FavoritesPage.scss";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import FilmCard from "../FilmCard/FilmCard";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const Films = useSelector((state) => {
    return state.films.films;
  });

  console.log(Films)

  const [favoriteFilms, setFavoriteFilms] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false)
  

  useEffect(() => {
    setFavoriteFilms(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  return (
    <div className="favoritesPage">
      <Header />
      <div className="favoriteFilmsBox">
        {Films && favoriteFilms!== null  ? (
          <div>
            {favoriteFilms.map(
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
                onClick={() => {
                  console.log('2342')
                  setIsRemoved(!isRemoved)
                  }}
                />
              )
            )}
          </div>
        ) : (
          <div>You can add the movie to your favorites</div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
