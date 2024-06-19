import jwt from "jsonwebtoken";

// Getting the environment variables
import dotevn from "dotenv";
dotevn.config();

const getTokenAndResponse = (res, user) => {
  // Gives the jwt token by taking the payload as the id of the newly created user and expires in 3 days
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Sends the response back to the user with cookie of jwt set to the token, userId set to logged in id of user and expires in 3 days
  res
    .cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      sameSite: "lax",
    })
    .status(200)
    .json({
      status: "success",
      token,
      user: user,
    });
};

export default getTokenAndResponse;
