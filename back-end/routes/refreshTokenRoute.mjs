import { Router } from "express";
import refreshTokenController from "../controllers/refreshTokenController.mjs";

const refreshTokenRoute = Router();

refreshTokenRoute.get("/api/refreshToken", refreshTokenController);

export default refreshTokenRoute;
