// Auth.jsx
import React, { useState, useContext } from "react";
import amazon_letter_logo from "../../assets/amazon_letter_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { auth } from "../../utility/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
import { IoWarningOutline } from "react-icons/io5";

// 🔹 Firebase error → user-friendly message
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password you entered is incorrect.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "Something went wrong. Please try again.";
  }
};

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });

  const navigate = useNavigate();
  const navigationStateData = useLocation();
  const [{ user }, dispatch] = useContext(DataContext);

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name.toLowerCase() === "signin") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navigationStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(getAuthErrorMessage(err.code));
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUP: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navigationStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(getAuthErrorMessage(err.code));
          setLoading({ ...loading, signUP: false });
        });
    }
  };

  return (
    <section className={styles.login}>
      <Link to="/">
        <img src={amazon_letter_logo} alt="Amazon logo" />
      </Link>

      <div className={styles.login__container}>
        <h1>Sign In</h1>

        {navigationStateData?.state?.msg && (
          <small style={{ color: "red", fontWeight: "bold" }}>
            {navigationStateData.state.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            name="signIn"
            onClick={authHandler}
            className={styles.login__signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale.
        </p>

        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={styles.login__registerButton}
        >
          {loading.signUP ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <div className={styles.error_holder}>
            <div className={styles.error__icon}>
              <IoWarningOutline size={25} />
            </div>
            <div>{error}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SignIn;
