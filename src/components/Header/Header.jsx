import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="Header">
      Header
      <div>
          <Link to={"/favorites"}>favorites</Link>
      </div>
    </div>
  );
}

export default Header;
