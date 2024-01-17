const dotenv = require("dotenv");
const express = require("express");
const userRoutes = require("./router/userRoutes");
const articleRoutes = require("./router/articleRoutes");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
const app = express();

require("./db/conn");
app.use(express.json());

const PORT = process.env.PORT;
authRouter.use(cookieParser());
authRouter.use("/user", userRoutes);
authRouter.use("/articles", articleRoutes);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Listening to port no. ${PORT}`);
});
