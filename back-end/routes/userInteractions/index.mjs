import express from "express";
import { checkUserInteractions } from "../../controllers/userInteractions/userInteractionController.mjs";

const userInteractionRouter = express.Router();

userInteractionRouter.get("/api/userInteractions", checkUserInteractions);

export default userInteractionRouter;
