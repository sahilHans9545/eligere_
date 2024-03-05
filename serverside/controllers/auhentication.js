const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendMail = require("../utils/sendMail");
const OtpModel = require("../models/Otp");

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already Exist", status: "no" });
    } else {
      const otp = generateOtp();
      const otpPayload = {
        email: email,
        otp: otp,
      };

      const newOtp = await OtpModel.create(otpPayload);

      await newOtp.save();

      await sendMail(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: <span style="color:blue">${otp}</span> </p>`
      );

      res
        .status(200)
        .send({ message: "OTP is sent to your account please verify" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

const verifyOtpToRegister = async (req, res) => {
  const { otp, email, fullname, phoneNumber } = req.body;
  // password minimum length validation

  const response = await OtpModel.find({ email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  }

  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
  });

  await newUser.save();
  const authToken = jwt.sign(
    {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "User Registered Successfully",
    user: newUser,
    token: authToken,
  });
};

const resendOtpToRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    const otpPayload = {
      email: email,
      otp: otp,
    };

    const newOtp = await OtpModel.create(otpPayload);

    await newOtp.save();

    await sendMail(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: <span style="color:blue">${otp}</span> </p>`
    );

    res
      .status(200)
      .send({ message: "OTP is sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  registerUser,
  generateOtp,
  verifyOtpToRegister,
  resendOtpToRegister,
};
