import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/rootWatcher";
import films_Reducer from "./films_Reducer";

const rootReducer = combineReducers({
  films: films_Reducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher);
export default store;
