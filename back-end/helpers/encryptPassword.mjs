import bcrypt from "bcrypt";
import "dotenv/config";

const encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default encryptPassword;
