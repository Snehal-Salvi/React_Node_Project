import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.css";
import logo from "../../assets/logo.png";

export default function Footer() {
   

  return (
    <div className={`navbar fixed-bottom ${styles.footer}`}>
      <div className={styles.logoAndText}>
        {/* App logo */}
        <img className={styles.appLogo} src={logo} alt="Homemaid-logo" />
        {/* App name and current year */}
        <h6 className={styles.footerText}>Homemaid &copy; 2024</h6>
      </div>

      {/* Social media links */}
      <div className={styles.socialLinks}>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/snehal.salvi_/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        {/* Facebook */}
        <a
          href="https://www.facebook.com/snehal.salvi.1422"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com/salvi_snehal"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        {/* LinkedIn */}
        <a
          href="http://linkedin.com/in/snehalsalvi"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
}
