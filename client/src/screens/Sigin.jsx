import { useState } from "react";
import "./Signin.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Sigin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const {name,value} = e.target;
    setData({...data,[name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(data);
      const response = await axios.post(`/api/login`,data);
      if(response.status===201)
      {
        alert("Logined Successfully");
        navigate("/");
      }
      else{
        alert("Login Failed");
        throw new Error("Login Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
    
  };
  return (
    <div>
        <section className="container">
          <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
              <h1 className="opacity">LOG-IN</h1>
              <form onSubmit={handleSubmit}>
                <input onChange={inputHandler} name="email" value={data.email} type="email" placeholder="Email ID" />
                <input onChange={inputHandler} name="password" value={data.password} type="password" placeholder="Password" />
                <button className="opacity mt-3 mb-0" type="submit">SUBMIT</button>
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
    </div>
  );
}
