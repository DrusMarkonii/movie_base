import { all } from "redux-saga/effects";
import { filmsGetDataWatcher } from "./filmApiSaga";

export function* rootWatcher() {
  yield all([filmsGetDataWatcher()]);
}
