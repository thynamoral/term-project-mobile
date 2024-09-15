import { Router } from "express";
import loginController from "../../controllers/auth/loginController.mjs";

const loginRoute = Router();

loginRoute.post("/api/login", loginController);

export default loginRoute;
