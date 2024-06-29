import React, { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/dashboard?tab=profile"
            className={`${styles.navLink} ${
              tab === "profile" ? styles.active : ""
            }`}
          >
            <HiUser className={styles.icon} />
            Profile
          </Link>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navLink}>
            <HiArrowSmRight className={styles.icon} />
            Sign Out
          </div>
        </li>
      </ul>
    </div>
  );
}
