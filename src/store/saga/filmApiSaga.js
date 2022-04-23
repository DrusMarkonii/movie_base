import { call, put, takeEvery } from "redux-saga/effects";
import { getPopularFilms, getGenres } from "../../service/endpoints";
import {
  ADD_POPULAR_FILMS,
  ADD_GENRES,
  FETCH_POPULAR_FILMS,
  FETCH_GENRES,
} from "../action-creators/filmsTypes";

export function* loadPopularFilms() {
  const popularFilms = yield call(getPopularFilms);
  yield put({ type: ADD_POPULAR_FILMS, payload: popularFilms });
}

export function* loadGenres() {
  const genres = yield call(getGenres);
  yield put({ type: ADD_GENRES, payload: genres });
}

export function* filmsGetDataWatcher() {
  yield takeEvery(FETCH_POPULAR_FILMS, loadPopularFilms);
  yield takeEvery(FETCH_GENRES, loadGenres);
}
