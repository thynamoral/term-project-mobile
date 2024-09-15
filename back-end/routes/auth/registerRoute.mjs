import { Router } from "express";
import registerController from "../../controllers/auth/registerController.mjs";

const registerRoute = Router();

registerRoute.post("/api/register", registerController);

export default registerRoute;
