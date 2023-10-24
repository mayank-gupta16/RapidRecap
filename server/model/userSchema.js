const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: 
        {
          type: Number,
          required: true,
        },
      password: 
        {
          type: String,
          required: true,
        },
        cpassword: 
            {
            type: String,
            required: true,
        },
        verified: {
          type: Boolean,
          default: false,
          required: true,
        },
    },
    { collection: "Users" }
  );

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const pass = this.password;
    this.password = await bcrypt.hash(pass, 12);
    this.cpassword = await bcrypt.hash(pass, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
  
const User = mongoose.model("USER", userSchema);

module.exports = User;