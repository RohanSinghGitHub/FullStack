const router = require("express").Router();
const User = require("../models/User");
const userLogin = require("../controllers/userLogin");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/login", (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (user) {

      if (password === user.password) {
        const token = jwt.sign(
          {
            email: user.email
          },
          'therealstateproject'
        )
        res.send({ message: "Login Successfull", user: token })
      }
      else {
        res.send({ message: "Password didnt match" })
      }
    } else {
      res.send("user not registered")
    }
  })
})

//signup! creating a new user here using POST request!

router.post("/register", (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registered" })
    }
    else {
      const user = new User({
        email,
        password
      })
      user.save(err => {
        if (err) {
          res.send(err)
        }
        else {
          res.send({ message: "user added sussefully", });
        }
      })
    }
  })
  console.log(User)
})


module.exports = router;
