const express = require("express");
const authRouter = express.Router();
const cookieParser = require('cookie-parser');
authRouter.use(cookieParser());

const articleRoutes = require("../controllers/article");
const userRoutes = require("../controllers/user");

authRouter.use('/user',userRoutes);
authRouter.use('/articles',articleRoutes);


module.exports = authRouter;
