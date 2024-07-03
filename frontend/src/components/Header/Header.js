import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../Redux/user/userSlice";
import { BACKEND_URL } from "../../utils/constants";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/signout`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
                {currentUser ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="userMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={currentUser.profilePicture}
                        alt="user"
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />{" "}
                      {currentUser.username}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userMenu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard?tab=profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={handleSignout}>
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/signin">
                    <button
                      className={`btn btn-outline-success ${styles.loginButton}`}
                    >
                      Login
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
