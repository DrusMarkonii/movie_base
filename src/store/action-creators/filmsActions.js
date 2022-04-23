import {
  ADD_GENRES,
  ADD_IN_FAVORITE_FILM,
  ADD_POPULAR_FILMS,
  FETCH_POPULAR_FILMS,
  FETCH_GENRES
} from "./filmsTypes";

export const addFavoriteFilmAction = (payload) => ({
  type: ADD_IN_FAVORITE_FILM,
  payload,
});

export const addGenresAction = (payload) => ({
  type: ADD_GENRES,
  payload,
});

export const addPopularFilms = (payload) => ({
  type: ADD_POPULAR_FILMS,
  payload,
});
export const fetchPopularFilms = () => ({ type: FETCH_POPULAR_FILMS });
export const fetchGenres = () => ({ type: FETCH_GENRES });
