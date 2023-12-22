import { useState, useContext, useRef } from "react";
import "./EmailVerify.css";
import axios from "axios";
import { Otptimer } from "otp-timer-ts";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/appContext";
import Loading from "./Loading";
const EmailVerify = ({ email }) => {
  const { state, dispatch } = useContext(AppContext);
  const forgetPassword = state.forgotPassword;
  const [load, setLoad] = useState(false); //for loading spinner
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    i1: "",
    i2: "",
    i3: "",
    i4: "",
    i5: "",
    i6: "",
  });
  const refs = {
    i1: useRef(null),
    i2: useRef(null),
    i3: useRef(null),
    i4: useRef(null),
    i5: useRef(null),
    i6: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (otp[name] !== "" && value !== "") {
      return;
    }
    setOtp({ ...otp, [name]: value });

    if (value !== "" && /^[0-9]$/.test(value)) {
      const nextInput =
        name === "i6" ? null : refs[`i${parseInt(name[1], 10) + 1}`];
      nextInput && nextInput.current.focus();
    }
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    const otpValue = `${otp.i1}${otp.i2}${otp.i3}${otp.i4}${otp.i5}${otp.i6}`;
    const data = { otp: otpValue, email: email };
    setLoad(true);
    try {
      const response = await axios.post(
        `/api/user/verifyEmail?forgotPassword=${forgetPassword}`,
        data
      );
      if (response.status === 201) {
        alert("Email Verified");
        if (forgetPassword) {
          //console.log(forgetPassword);
          await dispatch({ type: "verifyEmail", payloadverifyEmail: false });

          navigate("/signin");
        } else {
          // console.log(forgetPassword);
          // console.log(state.modal);
          await dispatch({ type: "showModal", payloadModal: false });
          navigate("/signin");
        }
      }
      return;
    } catch (error) {
      alert("Email Verification Failed");
      console.log(error.response.data.error);
    } finally {
      setLoad(false);
    }
    //console.log(otpValue);
  };

  const showEmail = () => {
    let i = email.indexOf("@");

    const starredEmail =
      email.slice(0, 2) + email.slice(2, i).replace(/./g, "*") + email.slice(i);
    return starredEmail;
  };

  const resendOTP = async (e) => {
    //e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(`/api/user/resendOTP`, {
        email: email,
      });
      if (response.status === 201) {
        alert("OTP sent");
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error.response.data.error);
    } finally {
      setLoad(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    setOtp({
      i1: pastedData[0] || "",
      i2: pastedData[1] || "",
      i3: pastedData[2] || "",
      i4: pastedData[3] || "",
      i5: pastedData[4] || "",
      i6: pastedData[5] || "",
    });
  };

  const handleKeyDown = (e) => {
    const { name, value } = e.target;
    const isBackspace = e.code === "Backspace";
    if (isBackspace) {
      // If backspace is pressed and the current input is empty, move focus to the previous input
      if (value === "") {
        const prevInput =
          name === "i1" ? null : refs[`i${parseInt(name[1], 10) - 1}`];
        prevInput && prevInput.current.focus();
      }
    }
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
          {Object.keys(otp).map((key, index) => (
            <input
              key={index}
              onChange={handleChange}
              onPaste={handlePaste}
              name={key}
              value={otp[key]}
              type="number"
              className={`otp__digit otp__field__${index + 1}`}
              ref={refs[key]}
              onKeyDown={handleKeyDown}
              maxLength={1}
            />
          ))}
        </div>
        <button
          onClick={submitOTP}
          className="btn btn-primary my-3"
          disabled={load}
        >
          Verify
        </button>
        <p className="resend text-white mb-0">Didn't receive code?</p>
        <Otptimer minutes={0} seconds={60} onResend={resendOTP} />
      </form>
      <div className="mt-3">{load && <Loading />}</div>
    </div>
  );
};

export default EmailVerify;
