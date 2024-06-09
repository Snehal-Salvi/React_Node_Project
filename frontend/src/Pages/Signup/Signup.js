import React from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className={styles.signupContainer}>
      <h1>Sign up</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="username" id="username" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="abc@email.com" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="password" id="password" />
        </div>
        <button>Signup</button>
      </form>

      <div>
        <span>Have an account? </span>
        <Link to="/signin">SignIn</Link>
      </div>
    </div>
  );
}
