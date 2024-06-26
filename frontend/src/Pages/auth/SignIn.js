import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../../utils/constants.js';
import styles from "./auth.module.css";
import Loader from "../../components/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../Redux/user/userSlice.js";
import OAuth from "../../components/OAuth/OAuth.js";
 

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (  !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
 
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="abc@email.com" id="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*********" id="password" onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Sign In'}
        </button>
        <OAuth/>
      </form>

      <div>
        <span>Don't have an account? </span>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}
