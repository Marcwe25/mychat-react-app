import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticationActionsCreators } from "../../reduxConfig/creatorsIndex";
import "./Login.css";
import RememberMe from "./RememberMe";
import {
  loginRemebered,
  setRefreshToken,
  setRememberMe,
} from "../authentication/authActions";
import {
  REFRESH_TOKEN,
  REGISTRATION_PAGE,
  REMEMBERME,
} from "../../const/constNames";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import { gcountURL } from "../../const/constsURL";

function Login({ selectPage }) {
  const dispatch = useDispatch();
  const { loginUser } = bindActionCreators(
    authenticationActionsCreators,
    dispatch
  );
  const [authenticationError, setAuthenticationError] = useState(null);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showGoogle, setShowGoogle] = useState(false);

  async function gcount() {
    const response = await axios.get(gcountURL);
    const count = response.data;
    console.log("gcount", count);
    if (count < 50) {
      setShowGoogle(true);
    } else {
      setShowGoogle(false);
    }
  }

  useEffect(() => {
    gcount();
    const docheckremember = localStorage.getItem(REMEMBERME);
    console.log(
      "docheckremember",
      docheckremember,
      docheckremember === "yesdo"
    );

    if (docheckremember === "yesdo") {
      dispatch(loginRemebered());
    } else {
      localStorage.clear();
    }
  }, []);

  dispatch(setRememberMe(localStorage.getItem(REMEMBERME)));
  dispatch(setRefreshToken(localStorage.getItem(REFRESH_TOKEN)));

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (authenticationError != null) setAuthenticationError(null);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    loginUser(inputs, setAuthenticationError);
  };

  const goToRegistration = () => {
    selectPage(REGISTRATION_PAGE);
  };

  return (
    <div>
      <div className="login-container back_image">
        <form method="post" onSubmit={submitHandler} className="loginForm">
          <div className="titleBack">
            <p className="loginTitle">
              <span className="bigger headerTitle ">K</span>{" "}
              <span className="big">chat</span>
            </p>
          </div>

          <div className="inputField">
            <div className="profileIcon iconPlacement" />

            <input
              className="p0"
              type="text"
              name="username"
              placeholder="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </div>

          <div className="inputField">
            <div className="lockIcon iconPlacement" />

            <input
              className="p0"
              type="password"
              name="password"
              placeholder="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            value="login"
            className="submit_button clickable"
          />

          <div className="loginLinks1">
            <RememberMe />
            <div className="clickable2" onClick={goToRegistration}>
              forgot password
            </div>
          </div>

          <div className="loginLinks1">
            <div className="clickable2" onClick={goToRegistration}>
              register
            </div>
            <div className="clickable2" onClick={goToRegistration}>
              contact us
            </div>
          </div>
          {showGoogle && (
            <div>
              <div className="loginLinks1 m10">
                <div className="q2" />
                <span className="q1">or</span>
                <div className="q2" />
              </div>

              <GoogleLogin />
            </div>
          )}
          <p className="error">
            {authenticationError?.length > 0 ? authenticationError : ""}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
