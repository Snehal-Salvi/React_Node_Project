import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/SideBar/Sidebar';
import Profile from '../../components/Profile/Profile';
import styles from './dashboard.module.css';

export default function Dashboard() {
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
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarContainer}>
        {/* Sidebar */}
        <Sidebar />
      </div>

      <div className={styles.profileContainer}>
      {/* profile... */}
      {tab === "profile" && <Profile />}
      </div>
    </div>
  );
}
