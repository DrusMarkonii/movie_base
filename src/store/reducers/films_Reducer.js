import {
  ADD_POPULAR_FILMS,
  ADD_IN_FAVORITES,
  ADD_GENRES,
  LOAD_FAVORITES,
  REMOVE_FROM_FAVORITES,
  ADD_SCROLL_LOADED_FILMS,
} from "../action-creators/filmsTypes";

const defaultStateFilms = {
  films: [],
  favoriteFilms: [],
  genres: [],
};

const films_Reducer = (state = defaultStateFilms, action) => {
  switch (action.type) {
    case ADD_POPULAR_FILMS: {
      return {
        ...state,
        films: [action.payload],
      };
    }
    case ADD_SCROLL_LOADED_FILMS: {
      return {
        ...state,
        films: [...state.films, action.payload],
      };
    }
    case ADD_IN_FAVORITES: {
      return {
        ...state,
        favoriteFilms: [...state.favoriteFilms, action.payload],
      };
    }
    case REMOVE_FROM_FAVORITES: {
      return {
        ...state,
        favoriteFilms: state.favoriteFilms.filter(
          (film) => film.id !== action.payload
        ),
      };
    }
    case LOAD_FAVORITES: {
      return {
        ...state,
        favoriteFilms: action.payload,
      };
    }
    case ADD_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }

    default:
      return state;
  }
};

export default films_Reducer;
