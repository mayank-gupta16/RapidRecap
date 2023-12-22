import React, { useState, useContext } from "react";
import { AppContext } from "../contextAPI/appContext";
import axios from "axios";

const ResetPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch } = useContext(AppContext);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`/api/user/forgotPassword`, {
        email,
        newPassword,
      });
      //console.log(response);
      if (response.status === 201) {
        alert("Password Reset Successfully");
        dispatch({ type: "forgotPassword", payloadForgotPassword: false });
        dispatch({ type: "showModal", payloadModal: false });
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div className="d-flex flex-column gap-3 mt-3">
        <div className="d-grid">
          <div className="row">
            <div className="col-6 d-flex">
              <label className="ms-auto me-4">New Password:</label>
            </div>
            <div className="col-6 d-flex">
              <input
                className="me-auto"
                type="password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-grid">
          <div className="row">
            <div className="col-6 d-flex">
              <label className="ms-auto me-4">Confirm Password:</label>
            </div>
            <div className="col-6 d-flex">
              <input
                className="me-auto"
                type="password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-5 bg-white rounded-2 border-0 p-2"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
