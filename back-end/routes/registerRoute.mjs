import { Router } from "express";
import registerController from "../controllers/registerController.mjs";

const registerRoute = Router();

registerRoute.post("/api/register", registerController);

export default registerRoute;
