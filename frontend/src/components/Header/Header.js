import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg fixed-top ${styles.header}`}>
        <div className="container-fluid">
          <img src={logo} alt="Homemaid-logo" className={styles.logo} />
          <Link className={`navbar-brand ${styles.appName}`} to="/">
            HOMEMAID
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${styles.navLink}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login">
                  <button
                    className={`btn btn-outline-success  ${styles.loginButton} `}
                  >
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
