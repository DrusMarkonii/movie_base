import axios from "axios";

export const API_KEY = "cec84349983050a0e6e65380ebeca52a";
export const IMAGE_API_PATH = "https://image.tmdb.org/t/p/original";
const GENRE_LIST = "https://api.themoviedb.org/3/genre/movie/list";
const POPULAR_FILMS = "https://api.themoviedb.org/3/movie/popular";
const DESCRIPTION_OF_FILM = "https://api.themoviedb.org/3/movie";

export const getPopularFilms = async () => {
  try {
    const response = await axios.get(POPULAR_FILMS, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        api_key: API_KEY,
      }, 
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


export const getGenres = async () => {
  try {
    const response = await axios.get(GENRE_LIST, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFilmOfDescription = async (id) => {
  try {
    const response = await axios.get(`${DESCRIPTION_OF_FILM}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getRecommendedFilms = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrailerOfFilm = async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            api_key: API_KEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
