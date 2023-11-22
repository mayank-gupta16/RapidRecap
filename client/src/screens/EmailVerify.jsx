import { useState } from "react";
import "./EmailVerify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const EmailVerify = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    i1: "",
    i2: "",
    i3: "",
    i4: "",
    i5: "",
    i6: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    const otpValue = `${otp.i1}${otp.i2}${otp.i3}${otp.i4}${otp.i5}${otp.i6}`;
    const data = { otp: otpValue, email: email };
    try {
      const response = await axios.post(`/api/user/verifyEmail`, data);
      if (response.status === 201) {
        alert("Email Verified");
        navigate("/signin");
      } else {
        alert("Email Verification Failed");
        throw new Error("Email Verification Failed");
      }
    } catch (error) {
      alert("Email Verification Failed");
      console.log(error.message);
    }
    //console.log(otpValue);
  };

  const showEmail = () => {
    let i = email.indexOf("@");

    const starredEmail =
      email.slice(0, 2) + email.slice(2, i).replace(/./g, "*") + email.slice(i);
    return starredEmail;
  };

  return (
    <div>
      <form className="otp-form" name="otp-form">
        <div className="title">
          <h3>OTP VERIFICATION</h3>
          <p className="info">An otp has been sent to {showEmail()}</p>
          <p className="msg">Please enter OTP to verify</p>
        </div>
        <div className="otp-input-fields">
          <input
            onChange={handleChange}
            name="i1"
            value={otp.i1}
            type="number"
            className="otp__digit otp__field__1"
          />
          <input
            onChange={handleChange}
            name="i2"
            value={otp.i2}
            type="number"
            className="otp__digit otp__field__2"
          />
          <input
            onChange={handleChange}
            name="i3"
            value={otp.i3}
            type="number"
            className="otp__digit otp__field__3"
          />
          <input
            onChange={handleChange}
            name="i4"
            value={otp.i4}
            type="number"
            className="otp__digit otp__field__4"
          />
          <input
            onChange={handleChange}
            name="i5"
            value={otp.i5}
            type="number"
            className="otp__digit otp__field__5"
          />
          <input
            onChange={handleChange}
            name="i6"
            value={otp.i6}
            type="number"
            className="otp__digit otp__field__6"
          />
        </div>
        <button onClick={submitOTP} className="btn btn-primary my-3">
          Verify
        </button>

        <p className="resend text-white mb-0">
          Didn't receive code? <a href="">Request again</a>
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;
