import React, { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import { signoutSuccess } from "../../Redux/user/userSlice";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../../utils/constants";

export default function Sidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
          <div className={styles.navLink} onClick={handleSignout}>
            <HiArrowSmRight className={styles.icon} />
            Sign Out
          </div>
        </li>
      </ul>
    </div>
  );
}
