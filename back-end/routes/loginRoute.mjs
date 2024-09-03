import { Router } from "express";
import loginController from "../controllers/loginController.mjs";

const loginRoute = Router();

loginRoute.post("/api/login", loginController);

export default loginRoute;
