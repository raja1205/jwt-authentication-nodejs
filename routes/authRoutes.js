const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const { hashGenerate } = require("../utils/hashing");
const { hashValidator } = require("../utils/hashing");
const { tokenGenerator } = require("../utils/token");
const { authVerify } = require("../middlewares/authVerify");

//Getting the user information when register and storing into the variable user
authRoutes.post("/signup", async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const saveduser = await user.save();
    res.send(saveduser);
    console.log(saveduser);
  } catch (err) {
    res.send(err);
  }
});

// Checking UN/PW in the DB
authRoutes.post("/signin", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      res.send("User not found / Invalid Email");
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        userExist.password
      );
      if (!checkUser) {
        res.send("Invalid password");
      } else {
        const token = await tokenGenerator(userExist.email);
        res.cookie("jwt", token);

        // To save this token, use the system's cookie-parser
        res.send(token);
      }
    }
  } catch (err) {
    res.send(err);
  }
});

//authVerify middleware is used to validate the token
authRoutes.get("/protected", authVerify, (req, res) => {
  res.send("I am from the Protected Route...");
});

module.exports = authRoutes;

/* For POSTMAN API TETSING:
For Sign UP: http://localhost:5100/api/user/signup
Paste the below code in POSTMAN->Method->POST, Body->Raw->JSON, 
{
		"username": "USERNAME",
		"email": "EMAILID",
		"password": "PASSWORD"
}

For Sign IN: http://localhost:5100/api/user/signin
Paste the below code in POSTMAN->Method->POST, Body->Raw->JSON, 
{
		"email": "EMAILID",
		"password": "PASSWORD"
}

Access the Protected Route: http://localhost:5100/api/user/protected
Paste the below code in POSTMAN->Method->GET, Body->Raw->JSON, 
{
		"email": "EMAILID",
		"password": "PASSWORD"
}
*/
