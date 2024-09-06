import { Router } from "express";
import refreshTokenController from "../controllers/refreshTokenController.mjs";
import verifyToken from "../middlewares/verifyToken.mjs";

const refreshTokenRoute = Router();

refreshTokenRoute.get("/api/refreshToken", verifyToken, refreshTokenController);

export default refreshTokenRoute;
