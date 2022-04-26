import axios from "axios";

export const API_KEY = "cec84349983050a0e6e65380ebeca52a";
export const IMAGE_API_PATH = "https://image.tmdb.org/t/p/original";
export const DEFAULT_URL = "https://api.themoviedb.org/3/movie/";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: API_KEY,
  },
});

export const getPopularFilms = async () => {
  try {
    const response = await api({
      method: "GET",
      url: "movie/popular",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGenres = async () => {
  try {
    const response = await api({
      method: "GET",
      url: "genre/movie/list",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFilmOfDescription = async (id) => {
  try {
    const response = await api({
      method: "GET",
      url: `movie/${id}`,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getRecommendedFilms = async (id) => {
  try {
    const response = await api({
      method: "GET",
      url: `movie/${id}/recommendations`,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrailerOfFilm = async (id) => {
  try {
    const response = await api({
      method: "GET",
      url: `movie/${id}/videos`,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
