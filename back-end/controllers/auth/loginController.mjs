import User from "../../models/User.mjs";
import decryptPassword from "../../helpers/decryptPassword.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/jwtHelper.mjs";

const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Invalid credentials!" });
    return;
  }
  try {
    // Check if user exists
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    // Check if password is correct
    const isPasswordCorrect = await decryptPassword(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    // Generate access token
    const accessToken = generateAccessToken(foundUser);
    // Generate refresh token
    const refreshToken = generateRefreshToken(foundUser);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Login successful
    res.status(200).json({
      message: "Login successful!",
      accessToken,
      refreshToken,
      userId: foundUser._id,
      username: foundUser.username,
    });
    return;
  } catch (error) {
    console.log(error);
    console.log(`Can't login!`);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default loginController;
