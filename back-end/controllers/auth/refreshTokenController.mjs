import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/jwtHelper.mjs";

const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
  try {
    // verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Forbidden!" });
          return;
        }

        const foundUser = await User.findOne({ _id: decoded.userId }).exec();
        if (!foundUser || foundUser.refreshToken !== refreshToken) {
          res.status(403).json({ message: "Forbidden!" });
          return;
        }

        // generate new access token
        const accessToken = generateAccessToken(foundUser);

        // generate new refresh token
        const newRefreshToken = generateRefreshToken(foundUser);
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.status(200).json({
          message: "Refresh token successful!",
          accessToken,
          refreshToken: newRefreshToken,
        });
        return;
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default refreshTokenController;
