import { NavLink } from "react-router-dom";

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
