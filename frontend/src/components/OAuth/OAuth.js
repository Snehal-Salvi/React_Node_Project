import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../../Redux/user/userSlice";
import { app } from "../../firebase";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./oauth.module.css"; // Import the CSS module

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async (event) => {
    event.preventDefault(); // Prevent default action
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-In Error:", error);
    }
  };

  return (
    <div>
      <hr />

      <button
        className={`btn btn-lg btn-google btn-block text-uppercase btn-outline ${styles.btnGoogle}`}
        onClick={handleGoogleClick}
      >
        <img
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="Google Logo"
        />{" "}
        Continue with Google
      </button>
    </div>
  );
}
