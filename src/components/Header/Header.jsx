import { NavLink, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.scss";

// const navigate = useNavigate();
const navigation = [
  { id: 1, title: "Films", path: "/" },
  { id: 2, title: "Favorites", path: "/favorites" },
];

function Header() {
  return (
    <div className="header">
      <nav>
        <ul className="navbar_List">
          {navigation.map(({ id, title, path }) => (
            <li key={id} className="navbar__list__item">
              <NavLink to={path}>{title}</NavLink>
            </li>
    
          ))}
          <li className="navbar__list__item"><Search /></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
