import React from "react";
import "./Register.css";

export default function Register() {
  return (
    <div>
      <body>
        <section className="container">
          <div className="r-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
              <h1 className="opacity">Welcome!</h1>
              <form>
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder="First Name" />
                  </div>
                  <div className="col">
                    <input type="text" placeholder="Last Name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" placeholder="Email ID" />
                  </div>
                  <div className="col">
                    <input type="text" placeholder="Mobile No." />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="password" placeholder="Password" />
                  </div>
                  <div className="col">
                    <input type="text" placeholder="Confirm Password" />
                  </div>
                </div>
                <button className="opacity mt-3 mb-0">SUBMIT</button>
              </form>
              <div className="r-forget opacity">
                <h6>
                  Already a Member ?<a href=""> Login Here</a>
                </h6>
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
