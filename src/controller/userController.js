const knex = require("../config/db");
// const totp = require("totp-generator");
// const otpGenerate = totp("WERTYUI236", { digits: 4, period: 60 });

// Function to generate a random 4-digit OTP
function generateOTP() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ot = generateOTP();
// console.log(`Generated OTP: ${ot}`);

const otp = async (req, res) => {
  try {
    const { email } = req.body;
    const dbEmail = await knex("users")
      .select("email")
      .where("email", email)
      .first();
    if (dbEmail) {
      const del = await knex("users").where(dbEmail).delete();
      if (del) {
        const query = await knex("users").insert({
          email: email,
          otp: ot,
        });
        if (query) {
          res.send({ status: 1, ot });
        } else {
          res.send({ status: 0, otp: "internal server error" });
        }
      }
    } else {
      const query = await knex("users").insert({
        email: email,
        otp: ot,
      });
      if (query) {
        res.send({ status: 1, ot });
      } else {
        res.send({ status: "00", otp: "internal server error" });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "000",
      message: "Internal Server Error",
    });
  }
};

const otpCheck = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const dbOtp = await knex("users")
      .select("otp")
      .where("email", email)
      .first();
    if (dbOtp.otp != otp) {
      res.send({ status: 0, message: "otp isn't correct" });
    } else {
      const otpGenerationTime = Date.now();
      console.log("otpGen:", otpGenerationTime);
      const expiryTime = 60000; // 1 minute in milliseconds

      setTimeout(() => {
        const currentTime = Date.now();
        console.log("curentTime:", currentTime);
        if (currentTime - otpGenerationTime >= expiryTime) {
          res.send({
            status: 0,
            message: "OTP has expired.",
          });
          console.log("OTP has expired.");
        } else {
          res.send({
            status: 1,
            message: "signUp successfully",
          });
        }
      }, expiryTime);
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 0,
      message: "Internal Server Error",
    });
  }
};

// resend otp is same as otp api

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const insert = await knex("users").insert(name, email, password);
  if (!insert) {
    res.send({ status: 0, message: "internal server error" });
  } else {
    res.send({ status: 1, message: "user inserted" });
  }
};
module.exports = { otp, otpCheck, signUp };
