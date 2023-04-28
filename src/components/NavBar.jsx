import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <Link to="/main">Main</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
