//Goal: JWT Authentication with Node.js
/* How to add a security layer when accessing different routes within a Node.js web application.

1 Create a NodeJS project and install these dependencies: express, mongoose, dotenv, jsonwebtoken, bcryptjs, nodemon

2 Create a Node.js server and connect to the Database

3 Create the user model and route

4 Create register and login functionality

5 Create middleware for authentication
*/

const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    console.log("DB connected");
  }
);

//whenever user requests the url "/api/user", then authRoutes will be invoked
app.use("/api/user", authRoutes);

app.listen(5100, () => {
  console.log("Server is running on port 5100 ");
});
