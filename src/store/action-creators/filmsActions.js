import {
  ADD_GENRES,
  ADD_IN_FAVORITES,
  ADD_POPULAR_FILMS,
  FETCH_POPULAR_FILMS,
  REMOVE_FROM_FAVORITES,
  FETCH_GENRES,
  LOAD_FAVORITES,
  ADD_SCROLL_LOADED_FILMS,
} from "./filmsTypes";

export const addToFavoritesAction = (payload) => ({
  type: ADD_IN_FAVORITES,
  payload,
});

export const removeFromFavoritesAction = (payload) => ({
  type: REMOVE_FROM_FAVORITES,
  payload,
});

export const loadFavorites = (payload) => ({
  type: LOAD_FAVORITES,
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
