const express = require("express");
const authRouter = express.Router();
//const authenticate = require("../middleware/authenticate");

const articleRoutes = require("./routes/articles");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/signin");
authRouter.use(articleRoutes);
authRouter.use(registerRoutes);
authRouter.use(loginRoutes);

// authRouter.get("/api/about",authenticate,(req, res) => {
//   res.send(req.rootUser);
// });

// authRouter.post("/api/contact",authenticate, async (req, res) => {
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

// authRouter.get("/api/logout",authenticate,(req, res) => {
//   res.clearCookie('jwtoken',{path : '/'});
//   res.status(201).send("User Logout");
// });

module.exports = authRouter;
