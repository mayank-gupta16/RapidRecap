import React from "react";
import "./Signin.css";

export default function Sigin() {
  return (
    <div>
      <body>
        <section className="container">
          <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
              <h1 className="opacity">LOG-IN</h1>
              <form>
                <input type="text" placeholder="Email ID" />
                <input type="password" placeholder="Password" />
                <button className="opacity mt-3 mb-0">SUBMIT</button>
              </form>
              <div className="register-forget opacity">
                <a href="">Sign Up</a>
                <a href="">Forgot Password ?</a>
              </div>
            </div>
            <div className="circle circle-two"></div>
          </div>
          <div className="theme-btn-container"></div>
        </section>
      </body>
    </div>
  );
}
