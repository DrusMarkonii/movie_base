import MainPage from "../MainPage/MainPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.scss";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import Header from "../Header/Header";
import FilmPage from "../FilmPage/FilmPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route index element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
