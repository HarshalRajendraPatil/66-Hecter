// Requiring all the important packages
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import randomString from "randomstring";

// Requiring all the important modules
import CustomError from "../utils/customError.js";
import User from "../models/UserModel.js";
import getTokenAndResponse from "../utils/generateTokenAndResponse.js";
import setResetPasswordMail from "../service/sendResetPasswordMail.js";

// Global variable for storing id and token for forgot-password acc
let global = {
  id: null,
  token: null,
};

// Exporting the function for posting to the registration page
const register = async (req, res, next) => {
  try {
    // Checking if the email, password and username is entered or not
    const { email, passwordHash, name, phone, address } = req.body;
    if (!email || !passwordHash || !name || !phone || !address)
      return next(
        new CustomError("Please fill out all the fields correctly", 400)
      );

    // Checking if the email or username entered is already registered
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      if (user.email == email)
        return next(new CustomError("Email already in use. Please login", 400));
      else return next(new CustomError("Phone number already in use.", 400));
    }

    // Creating the user based on the data entered
    const createdUser = await User.create(req.body);

    getTokenAndResponse(res, createdUser);
  } catch (error) {
    // Gives the error the global error middleware
    next(error);
  }
};

// Exporting the function for posting to the login page
const login = async (req, res, next) => {
  const { email, passwordHash } = req.body;
  try {
    // Checking if the email and password is entered or not
    if (!email || !passwordHash)
      return next(new CustomError("Please enter you email and password", 403));

    // Finding the existing user with the entered email or username
    const user = await User.findOne({ email });

    // Error handling if entered email or username is incorrect
    if (!user) return next(new CustomError("Incorrect email. Try again", 400));

    // Error handling if entered password is incorrect
    const isMatched = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!isMatched)
      return next(new CustomError("Incorrect password. Try again.", 400));

    getTokenAndResponse(res, user);
  } catch (error) {
    // Gives the error the global error middleware
    next(error);
  }
};

// Exporting the function for posting to the forgot password page
const forgotPassword = async (req, res, next) => {
  try {
    const email = req.user.email;
    // Checking if the email is entered or not
    if (!email) return next(new CustomError("Please Login", 400));

    // Getting the user from the database with entered database
    const userData = await User.findOne({ email });

    // Handling error if the user is not found with entered email
    if (!userData)
      return next(
        new CustomError("This email does not exists. Please Register.", 400)
      );

    // Generating a random token with characters
    const token = req.user._id;

    // Calling the function to send the reset-password mail and returnt the response
    setResetPasswordMail(userData.name, userData.email, token, next, res);
  } catch (error) {
    // Gives the error the global error middleware
    next(error);
  }
};

// Exporting the function for posting to the forgot password page
const resetPassword = async (req, res, next) => {
  try {
    // Getting the value of password from the user
    const newPass = req.body.passwordHash;
    const token = req.params.token;

    // Checking for the token
    if (!token) return next(new CustomError("Please Login", 400));

    if (!(token == req.user._id))
      return next(new CustomError("Invalid token. Try again", 400));

    // Checking if the password is entered or not
    if (!newPass)
      return next(new CustomError("Please enter the new password", 400));

    // Hashing the password
    const hashedPass = await bcrypt.hash(newPass, 10);

    // Finding the user in the database with the provided token
    const tokenUser = await User.findById(req.user._id);

    // Updating the user with the new password and returning the new doc.
    const updatedUser = await User.findByIdAndUpdate(
      tokenUser._id,
      {
        $set: { passwordHash: hashedPass },
      },
      { new: true, runValidators: true }
    );

    // Sending the response to the user with the updated user
    res.status(200).json({
      status: "success",
      message: "Your password has been reset successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Exporting the function for getting the reset password page
const logout = (req, res, next) => {
  // Setting the value of jwt cookie to an empty string and then destroying the cookie in 1 ms followed by redirecting the user to the home page.
  res
    .cookie("jwt", "", { maxAge: 0 })
    .json({ status: "success", message: "User logged out" });
};

export { register, login, forgotPassword, resetPassword, logout };
