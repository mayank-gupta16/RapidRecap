import React from 'react'
import './Signin.css' 


export default function Sigin() {
  return (
    <div>
      <body>
    <section className="container">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
              
                <h1 className="opacity">LOGIN</h1>
                <form>
                    <input type="text" placeholder="Email ID" />
                    <input type="password" placeholder="Password" />
                    <button className="opacity">SUBMIT</button>
                </form>
                <div className="register-forget opacity">
                    <a href="">Register</a>
                    <a href="">Forgot Password ?</a>
                </div>
            </div>
            <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
    </section>
</body>
    </div>
  )
}
