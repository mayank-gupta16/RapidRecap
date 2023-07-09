const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const articleSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  dateTime: [
    {
      type: String,
      required: true,
    },
  ],
  author: [
    {
      type: String,
      required: true,
    },
  ],
  title: [
    {
      type: String,
      required: true,
    },
  ],
  mainText: [
    {
      type: String,
      required: true,
    },
  ],
  imgUrl: [
    {
      type: String,
      required: true,
    },
  ],
  sentiments: [
    {
      neg: {
        type: Number,
        required: true,
      },
      neu: {
        type: Number,
        required: true,
      },
      pos: {
        type: Number,
        required: true,
      },
      compound: {
        type: Number,
        required: true,
      },
    },
  ],
},{collection: 'Articles'});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     //console.log(this.password);
//     //console.log("hii from bcrypt");
//     const pass = this.password;
//     this.password = await bcrypt.hash(pass, 12);
//     this.cpassword = await bcrypt.hash(pass, 12);
//   }
//   next();
// });

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

// userSchema.methods.addMessage = async function ({
//   name,
//   email,
//   phone,
//   message,
// }) {
//   try {
//     this.messages = this.messages.concat({name,email,phone,message});
//     await this.save();
//     return this.messages;
//   } catch (error) {
//     console.log(error);
//   }
// };

const Article = mongoose.model("ARTICLE", articleSchema);

module.exports = Article;
