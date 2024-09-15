import User from "../../models/User.mjs";

const getUserController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "id is required!" });
    return;
  }

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default getUserController;
