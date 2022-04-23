import axios from "axios";

export const IMAGE_API_PATH = "https://image.tmdb.org/t/p/original";
const GENRE_LIST = "https://api.themoviedb.org/3/genre/movie/list";
const POPULAR_FILMS = "https://api.themoviedb.org/3/movie/popular";

export const getPopularFilms = async () => {
  try {
    const response = await axios.get(POPULAR_FILMS, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        api_key: "cec84349983050a0e6e65380ebeca52a",
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
        api_key: "cec84349983050a0e6e65380ebeca52a",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
