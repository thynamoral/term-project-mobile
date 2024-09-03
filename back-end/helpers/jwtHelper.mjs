import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const generateRefreshToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
};
