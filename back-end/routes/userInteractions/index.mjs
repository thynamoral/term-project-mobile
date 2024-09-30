import express from "express";
import { checkUserInteractions } from "../../controllers/userInteractions/userInteractionController.mjs";
import { getTotleLikes } from "../../controllers/like/likeBlogPostController.mjs";

const userInteractionRouter = express.Router();

userInteractionRouter.get(
  "api/blogposts/totalLikes/:blogPostId",
  getTotleLikes
);
userInteractionRouter.get("/api/userInteractions", checkUserInteractions);

export default userInteractionRouter;
