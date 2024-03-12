import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";
import { inherits } from "@babel/types";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#9F0013" : "inherit",
              })}
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              /* Убираем end чтоб все дочерние страницы после /comics сравнивались
             не строго и подкрашивались красным */

              // end
              to="/comics"
              style={({ isActive }) => ({
                color: isActive ? "#9F0013" : "inherit",
              })}
            >
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
