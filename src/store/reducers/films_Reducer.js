import {
  ADD_POPULAR_FILMS,
  ADD_IN_FAVORITE_FILM,
  ADD_GENRES,
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
        // films:state.films.concat(action.payload),
      };
    }
    case ADD_SCROLL_LOADED_FILMS: {
      return {
        ...state,
        films:state.films.concat(action.payload),
        // films:state.films.concat(action.payload),
      };
    }
    case ADD_IN_FAVORITE_FILM: {
      return {
        ...state,
        favoriteFilms: state.favoriteFilms.concat(action.payload),
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
