import { Link } from "react-router-dom";
import "./MainPage.scss";
import Header from "../Header/Header";

function MainPage() {
  return (
    <div className="MainPage">
    <Header />
      MainPage
      <Link to={"/film/123123313"}>Film</Link>
    </div>
  );
}

export default MainPage;
