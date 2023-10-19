const express = require("express");
const { otp, signUp, otpCheck } = require("../controller/userController");
const Router = express.Router();

Router.route("/otp").post(otp);
Router.route("/otp/check").post(otpCheck);
Router.route("/signup").post(signUp);
// Router.route("/login").post(login)

module.exports = Router;
