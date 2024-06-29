import { useSelector } from "react-redux";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <form className={styles.form}>
        <div className={styles.profilePictureContainer}>
          <img
            src={currentUser.profilePicture}
            alt="user"
            className={styles.profilePicture}
          />
        </div>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className={styles.input}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className={styles.input}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
      <div className={styles.actions}>
        <span
          className={styles.action}
          onClick={() => console.log("Delete Account")}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Account
        </span>
        <span className={styles.action} onClick={() => console.log("Sign Out")}>
          <FontAwesomeIcon icon={faSignOut} /> Sign Out
        </span>
      </div>
    </div>
  );
}
