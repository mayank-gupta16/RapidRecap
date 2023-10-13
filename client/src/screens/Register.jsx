import React from 'react'
import './Register.css'
export default function Register() {
  return (
    <div>
      <body>
    <section className="container">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
                <h1 className="opacity">Welcome!</h1>
                <form>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="Email ID" />
                    <input type="text" placeholder="Mobile No." />
                    <input type="password" placeholder="Password" />
                    <input type="text" placeholder="Confirm Password" />
                    <button className="opacity">SUBMIT</button>
                </form>
            </div>
            <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
    </section>
</body>
    </div>
  )
}
