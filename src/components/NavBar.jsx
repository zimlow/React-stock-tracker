import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to="/main">
              Main
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
