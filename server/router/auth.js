const express = require("express");
//const bcrypt = require("bcryptjs");
const router = express.Router();
//const jwt = require("jsonwebtoken");
//const authenticate = require("../middleware/authenticate");
require("../db/conn");
const Article = require("../model/userSchema");

router.get("/api", async (req, res) => {
  const { page = 1, pageSize = 9 } = req.query;
  try {
    //res.send("Hello world from router");
    const article = await Article.find({}).sort({
      dateTime: -1,
      "sentiments.compound": -1,
    }).skip((page - 1) * pageSize).limit(9);
    // article.map(async (ele) => {
    //   console.log(`${ele.imgURL}`);
    // });
    //res.json(JSON.stringify(article));
    res.send(article);
  } catch (error) {
    console.log(error.message);
  }
});

//Done with Async Await:
// router.post("/api/signup", async (req, res) => {
//   console.log(req.body);
//   const { name, email, phone, work, password, cpassword } = req.body;
//   //res.send("Hello from register");

//   if (!name || !email || !phone || !work || !password || !cpassword)
//     return res.status(422).json({ error: "Please fill the required field" });

//   try {
//     const response = await User.findOne({ email: email });
//     if (response)
//       return res.status(422).json({ error: "Email already exists" });
//     if (password != cpassword)
//       return res
//         .status(422)
//         .json({ error: "password is not equal to confirm password" });
//     if (phone.toString().length != 10) {
//       return res
//         .status(422)
//         .json({ error: "Phone no. should be of 10 digits" });
//     }
//     const user = new User({ name, email, phone, work, password, cpassword });
//     await user.save();
//     return res.status(201).json({ message: "Registered Successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/api/login", async (req, res) => {
//   //res.send("welcome to signin router page");
//   console.log(req.body);
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(422).json({ error: "Please fill the required field" });

//   try {
//     const findUser = await User.findOne({ email: email });
//     //console.log(findUser);
//     if (!findUser)
//       return res.status(422).json({ error: "Invalid Credentials" });

//     const isMatch = await bcrypt.compare(password, findUser.password);

//     const token = await findUser.generateAuthToken();
//     // console.log(token);
//     res.cookie("jwtoken", token, {
//       expires: new Date(Date.now() + 2592000000),
//       httpOnly: true,
//     });

//     if (!isMatch) return res.status(422).json({ error: "Invalid Credentials" });
//     return res.status(201).json({ message: "SignIn Successfull" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/api/about",authenticate,(req, res) => {
//   res.send(req.rootUser);
// });

// router.post("/api/contact",authenticate, async (req, res) => {
//  try {
//   const {name,email,phone,message} = req.body;
//   if(!name || !email || !phone || !message)
//   {
//     return res.status(422).json({ error: "Please fill the required field" });
//   }
//   const userData = await User.findOne({_id:req.userID});

//   if(userData)
//   {
//     const userMessage = await userData.addMessage({name,email,phone,message});
//     await userData.save();

//     res.status(201).json({message:"Message Send Successfully"});
//   }

//  } catch (error) {
//   console.log(error);
//  }

// });

// router.get("/api/logout",authenticate,(req, res) => {
//   res.clearCookie('jwtoken',{path : '/'});
//   res.status(201).send("User Logout");
// });

module.exports = router;
