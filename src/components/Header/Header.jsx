import { NavLink } from "react-router-dom";

import youtube from "../../assets/img/youtube.png";

import "./Header.scss";

const navigation = [
  { id: 1, title: "Films", path: "/" },
  { id: 2, title: "Favorites", path: "/favorites" },
];

function Header() {
  return (
    <div className="header">
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__list_logo">
            <NavLink to={"/"}>
              <img className="navbar__list_logo" src={youtube} alt="logo" />
            </NavLink>
          </li>
          {navigation.map(({ id, title, path }) => (
            <li key={id} className="navbar__list_item">
              <NavLink to={path}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
