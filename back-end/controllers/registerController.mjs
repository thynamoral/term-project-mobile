import User from "../models/User.mjs";
import encryptPassword from "../helpers/encryptPassword.mjs";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Invalid credentials!" });
    return;
  }

  try {
    // Check if user already exists
    const foundUser = await User.findOne({ username }).exec();
    if (foundUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    // Check if email already exists
    const foundEmail = await User.findOne({ email }).exec();
    if (foundEmail) {
      res.status(400).json({ message: "Email already exists!" });
      return;
    }

    // Create new user
    const hashedPassword = await encryptPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      console.log(`Error creating user!`);
      res.status(500).json({ message: "Something went wrong!" });
      return;
    } else {
      res.status(201).json({ message: "User created successfully!" });
      return;
    }
  } catch (error) {
    // console.log(error);
    console.log(`Error 500!`);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default registerController;
