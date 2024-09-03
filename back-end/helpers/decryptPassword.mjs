import bcrypt from "bcrypt";
import "dotenv/config";

const decryptPassword = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export default decryptPassword;
