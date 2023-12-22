import { useState, useContext, useEffect } from "react";
import "./Signin.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/appContext";
import { alertTitleClasses } from "@mui/material";
import EmailVerify from "../components/EmailVerify";
import Modal from "./Modal";
import ResetPassword from "../components/resetPassword";
export default function Sigin() {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(data);
      const response = await axios.post(`/api/user/login`, data);
      if (response.status === 201) {
        //await dispatch({ type: "showModal", payloadModal: false });
        dispatch({ type: "UNSHOW" });
        alert("Logined Successfully");
        navigate("/");
      } else {
        alert("Login Failed");
        throw new Error("Login Failed");
      }
    } catch (error) {
      alert("Login Failed");
      console.log(error.message);
    }
  };

  const forgotPassword = async () => {
    try {
      const response = await axios.post(`/api/user/resendOTP`, {
        email: data.email,
      });
      if (response.status === 201) {
        let i = data.email.indexOf("@");

        const starredEmail =
          data.email.slice(0, 2) +
          data.email.slice(2, i).replace(/./g, "*") +
          data.email.slice(i);
        await dispatch({ type: "forgotPassword", payloadForgotPassword: true });
        await dispatch({ type: "verifyEmail", payloadverifyEmail: true });
        alert("OTP sent to your email : " + starredEmail);
      }
      await dispatch({ type: "showModal", payloadModal: true });
    } catch (error) {
      alert(error.response.data.error);
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (state.show === false) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {state.modal && state.forgotPassword && !state.verifyEmail && (
        <Modal
          onClose={() => dispatch({ type: "showModal", payloadModal: false })}
        >
          <ResetPassword email={data.email} />
        </Modal>
      )}
      {state.modal && state.verifyEmail && (
        <Modal
          onClose={() => dispatch({ type: "showModal", payloadModal: false })}
        >
          <EmailVerify email={data.email} />
        </Modal>
      )}
      <div className="alert alert-warning" role="alert">
        You must log in to view this content.
      </div>
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <h1 className="opacity">LOG-IN</h1>
            <form onSubmit={handleSubmit}>
              <input
                onChange={inputHandler}
                name="email"
                value={data.email}
                type="email"
                placeholder="Email ID"
              />
              <input
                onChange={inputHandler}
                name="password"
                value={data.password}
                type="password"
                placeholder="Password"
              />
              <button className="opacity mt-3 mb-0" type="submit">
                SUBMIT
              </button>
            </form>
            <div className="register-forget opacity">
              <NavLink to="/register">Create an account</NavLink>
              <button onClick={forgotPassword}>Forgot Password ?</button>
            </div>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
  );
}
