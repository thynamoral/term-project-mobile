import { Router } from "express";
import getAllUsersController from "../../controllers/user/getAllUsersController.mjs";
import getUserController from "../../controllers/user/getUserController.mjs";

const userRoute = Router();

userRoute
  .get("/api/users", getAllUsersController)
  .get("/api/users/:id", getUserController);

export default userRoute;
