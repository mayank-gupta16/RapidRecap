const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
// Handle signup route
router.post('/register', async (req, res) => {
  //console.log(req.body);
  const { firstName, lastName ,email, phone, password, cpassword } = req.body;

  if (!firstName || !email || !phone || !lastName || !password || !cpassword)
    return res.status(422).json({ error: "Please fill the required field" });

  try {
    const response = await User.findOne({ email: email });
    if (response)
      return res.status(422).json({ error: "Email already exists" });
    if (password != cpassword)
      return res
        .status(422)
        .json({ error: "password is not equal to confirm password" });
    if (phone.toString().length != 10) {
      return res
        .status(422)
        .json({ error: "Phone no. should be of 10 digits" });
    }
    const user = new User({ firstName, lastName ,email, phone, password, cpassword });
    await user.save();
    return res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login', async (req, res) => {
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
      if (!isMatch) return res.status(422).json({ error: "Invalid Credentials" });
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
  });

router.post("/logout",authenticate,(req, res) => {
    res.clearCookie('jwtoken',{path : '/'});
    res.status(201).send("User Logout");
});  

router.get("/loginCheck",authenticate,(req, res) => {
  //console.log("auth");
  res.status(201).send("valid token");
});

module.exports = router;