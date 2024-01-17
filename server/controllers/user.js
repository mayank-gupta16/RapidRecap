const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const {
  generateOtp,
  mailTransporter,
  generateEmailTemplate,
} = require("../utils/mail");
const VerificationToken = require("../model/verificationToken");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, phone, password, cpassword } = req.body;

  if (!firstName || !email || !phone || !lastName || !password || !cpassword)
    return res.status(422).json({ error: "Please fill the required field" });

  try {
    const response = await User.findOne({ email: email });
    if (response)
      return res.status(422).json({ error: "Email already exists" });
    if (password.length < 8)
      throw new Error("Password should be of atleast 8 characters");

    if (password != cpassword)
      return res
        .status(422)
        .json({ error: "password is not equal to confirm password" });
    if (phone.toString().length != 10) {
      return res
        .status(422)
        .json({ error: "Phone no. should be of 10 digits" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      cpassword,
    });

    const OTP = generateOtp();
    const verificationToken = new VerificationToken({
      owner: user._id,
      token: OTP,
    });
    await verificationToken.save();
    user.resetOtpCnt();
    user.setOtpCntResetTime();
    await user.save();

    const transporter = await mailTransporter();
    await transporter.sendMail({
      from: "20ucs174@lnmiit.ac.in",
      to: user.email,
      subject: "OTP for verification",
      text: `Your OTP for verification`,
      html: generateEmailTemplate(OTP),
    });
    return res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

const loginUser = async (req, res) => {
  // Implement login logic here
  //console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ error: "Please fill the required field" });

  try {
    const findUser = await User.findOne({ email: email });
    //console.log(findUser);
    if (!findUser)
      return res.status(422).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Credentials" });
    const token = await findUser.generateAuthToken();
    // console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });

    return res.status(201).json({ message: "SignIn Successfull" });
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(201).send("User Logout");
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};

const loginCheck = async (req, res) => {
  //console.log("auth");
  //console.log(req.user);
  const user = await User.findById(req.user._id);
  res.status(201).send(user);
};

const verifyUser = async (req, res) => {
  const { otp, email } = req.body;
  //console.log(req.body);
  const forgotPassword = req.query.forgotPassword;
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("No user found");
    const userid = user._id;
    if (!userid || !otp.trim()) throw new Error("No user or otp provided");
    if (!isValidObjectId(userid)) throw new Error("Invalid user");

    if (user.verified && !forgotPassword)
      throw new Error("User already verified");

    const token = await VerificationToken.findOne({ owner: userid });
    if (!token) throw new Error("No token found");

    const isMatch = await token.compareToken(otp);

    if (!isMatch) throw new Error("Invalid OTP");

    user.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    if (!forgotPassword) {
      const transporter = await mailTransporter();
      await transporter.sendMail({
        from: "20ucs174@lnmiit.ac.in",
        to: user.email,
        subject: "Welcom to Rapid Recap",
        html: "<h1>Welcome to Rapid Recap. Your account has been verified successfully</h1>",
      });
    }
    res.status(201).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: error.message });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      throw new Error("No email provided : Write the Email in the email field");
    const user = await User.findOne({ email: email });
    const user_id = user._id;
    if (!user_id) throw new Error("No user found");
    const otpCnt = user.otpCnt;
    if (!user.otpCntResetTime || new Date() > user.otpCntResetTime) {
      user.resetOtpCnt();
      user.setOtpCntResetTime();
      await user.save();
    }
    if (otpCnt >= 3) {
      throw new Error(
        "OTP limit exceeded, Try again after " +
          user.otpCntResetTime.toLocalString
      );
    }
    const OTP = generateOtp();
    user.incrementOtpCnt();
    await user.save();
    const prevToken = await VerificationToken.findOne({ owner: user_id });
    if (prevToken) await VerificationToken.findByIdAndDelete(prevToken._id);
    const verificationToken = new VerificationToken({
      owner: user._id,
      token: OTP,
    });
    await verificationToken.save();
    const transporter = await mailTransporter();
    await transporter.sendMail({
      from: "20ucs174@lnmiit.ac.in",
      to: user.email,
      subject: "OTP for verification",
      text: `Your OTP for verification`,
      html: generateEmailTemplate(OTP),
    });
    return res.status(201).json({ message: "OTP send Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(422).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("No user found");
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword)
      throw new Error("New password should be different from old password");
    if (newPassword.length < 8)
      throw new Error("Password should be of atleast 8 characters");

    user.password = newPassword;
    user.cpassword = newPassword;

    await user.save();
    res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};

const handleGoogleLogin = async (req, res) => {
  const credential = req.body.credential;
  //console.log(req.body);
  //console.log(credential);
  try {
    const userInfo = jwt.decode(credential);
    let user = await User.findOne({ googleId: userInfo.sub });
    //console.log(userInfo);
    if (!user) {
      // If not, create a new user with Google data
      const name = userInfo.name.split(" ");
      user = new User({
        firstName: name[0],
        lastName: name[name.length - 1],
        // Add other necessary Google fields
        googleId: userInfo.sub,
        googleEmail: userInfo.email,
        verified: true,
      });
      await user.save();
    }

    const token = await user.generateAuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });
    res.status(201).json({ message: "Google Login Successfull" });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};
//module.exports = router;
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginCheck,
  verifyUser,
  resendOTP,
  forgotPassword,
  handleGoogleLogin,
};
