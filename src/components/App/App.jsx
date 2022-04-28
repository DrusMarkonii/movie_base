import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import MainPage from "../../page/MainPage/MainPage";
import FavoritesPage from "../../page/FavoritesPage/FavoritesPage";
import Header from "../Header/Header";
import FilmPage from "../../page/FilmPage/FilmPage";
import store from "../../store/reducers/rootReducer";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route index element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
