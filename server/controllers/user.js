const User = require("../model/userSchema");
const QuizAttempt = require("../model/quizAttemptSchema");
const DailyIQ = require("../model/dailyIQSchema");
const bcrypt = require("bcryptjs");
const {
  generateOtp,
  mailTransporter,
  generateEmailTemplate,
} = require("../utils/mail");
const VerificationToken = require("../model/verificationToken");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const { updatePercentilesOnQuizDeactivation } = require("../utils/quiz");
const { formatDate } = require("../utils/date");
const { progressBar } = require("../utils/progress");

const registerUser = async (req, res) => {
  //console.log(req.body);
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
      googleEmail: email,
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
    console.log(err);
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

    return res
      .status(201)
      .json({ message: "SignIn Successfull", user: findUser });
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
    let user = await User.findOne({
      $or: [
        { email: userInfo.email },
        { googleEmail: userInfo.email },
        { googleId: userInfo.sub },
      ],
    });
    //console.log(userInfo);
    if (user) {
      user.googleEmail = userInfo.email;
      user.googleId = userInfo.sub;
      user.verified = true;
    } else {
      console.log("User not found");
      // If not, create a new user with Google data
      const name = userInfo.name.split(" ");
      user = new User({
        firstName: name[0],
        lastName: name[name.length - 1],
        email: userInfo.email,
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
    res.status(201).json({ message: "Google Login Successfull", user });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};

const calculateUserIQScores = async (req, res) => {
  try {
    // Fetch all users
    console.log("\nFetching users...\n");
    const users = await User.aggregate([
      {
        $lookup: {
          from: "quiz_attempts",
          localField: "_id",
          foreignField: "user",
          as: "quizAttempts",
        },
      },
      {
        $addFields: {
          distinctArticles: { $size: { $setUnion: "$quizAttempts.article" } },
        },
      },
      {
        $match: {
          distinctArticles: { $gte: 10 },
        },
      },
    ]);
    console.log("\nFetched users.\n");
    // Array to store user scores
    const userScores = [];
    let sumOfUserScores = 0;
    const updateProgress1 = progressBar(users.length);
    // Fetch quiz attempts concurrently for each user
    const fetchQuizAttemptsPromises = users.map(async (user) => {
      const quizAttempts = await QuizAttempt.find({ user: user._id }).populate({
        path: "article",
        populate: { path: "quiz" },
      });
      updateProgress1();
      return { user, quizAttempts };
    });

    const userQuizAttempts = await Promise.all(fetchQuizAttemptsPromises);
    console.log("\nFetched quiz attempts.\n");
    // Iterate through each user's quiz attempts
    console.log("\nCalculating user scores...\n");
    const updateProgress2 = progressBar(userQuizAttempts.length);
    for (const { user, quizAttempts } of userQuizAttempts) {
      let userScore = 0;

      for (const attempt of quizAttempts) {
        // Check if quiz attempt, quiz, and article exist
        if (!attempt || !attempt.article || !attempt.article.quiz) {
          console.error("Invalid quiz attempt data.");
          continue; // Skip this attempt
        }

        // Check if the quiz attempt is valid based on its creation date and quiz activity
        // if (
        //   attempt.article.quiz.createdAt.getTime() + 24 * 60 * 60 * 1000 <
        //   Date.now()
        // ) {
        if (attempt.article.quiz.isActive) {
          await updatePercentilesOnQuizDeactivation({
            id: attempt.article._id,
          });
          attempt.article.quiz.isActive = false;
          await attempt.article.quiz.save();
        }
        // Calculate score for the quiz attempt (Wi * Pi)
        const quizScore = attempt.articleDifficulty * attempt.userPercentile;
        userScore += quizScore;
        //}
      }
      sumOfUserScores += userScore;
      // Add user score to the array
      userScores.push({ user, userScore });
      updateProgress2();
    }

    // Calculate mean and standard deviation
    const meanOfUserScores = sumOfUserScores / userScores.length;
    const sumOfSquares = userScores.reduce(
      (acc, user) => acc + Math.pow(user.userScore - meanOfUserScores, 2),
      0
    );
    const standardDeviation = Math.sqrt(sumOfSquares / userScores.length);

    // Calculate and update IQ scores for each user
    console.log("\nCalculating IQ scores...\n");
    const updateProgress3 = progressBar(userScores.length);
    for (const user of userScores) {
      if (!user || !user.user) {
        console.error("Invalid user data.");
        continue; // Skip this user
      }

      const normalizedScore =
        (user.userScore - meanOfUserScores) / standardDeviation;
      const IQScore = 100 + 15 * normalizedScore;
      const updatedUser = await User.findById(user.user._id);
      updatedUser.IQ_score = Math.round(IQScore);
      await updatedUser.save();
      updateProgress3();
    }

    // Send success response
    res.status(200).json({ message: "IQ scores calculated successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error calculating IQ score:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Controller function to get user's IQ score history
const getUserIQScoreHistory = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you pass userId in the URL parameters

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Populate the dailyIQScores array to get the actual IQ score documents
    await user.populate("dailyIQScores").execPopulate();

    // Extract relevant information from the populated array
    const iqScoresHistory = user.dailyIQScores.map((score) => ({
      date: formatDate(score.date),
      IQScore: score.IQ_score,
      dailyRank: score.dailyRank,
    }));

    // Send the IQ score history to the frontend
    res.status(200).json({ IQ_score_history: iqScoresHistory });
  } catch (error) {
    console.error("Error fetching user IQ score history:", error);
    res.status(500).json({ message: "Internal server error" });
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
  calculateUserIQScores,
  getUserIQScoreHistory,
};
