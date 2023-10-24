const nodemailer = require("nodemailer");
const generateOtp = () => {
    let otp = "";
  for (let i = 0; i <= 3; i++) {
    otp += Math.round(Math.random() * 9);
  }
  return otp;
};

const mailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const generateEmailTemplate = (code)=>{
    return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Rapid Recap</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Rapid Recap. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
      <p style="font-size:0.9em;">Regards,<br />Rapid Recap</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Rapid Recap Inc</p>
        <p>Jaipur</p>
        <p>India</p>
      </div>
    </div>
  </div>`;
  }
module.exports = { generateOtp, mailTransporter, generateEmailTemplate };
