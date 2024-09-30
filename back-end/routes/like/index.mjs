import express from "express";
import {
  likeBlogPost,
  unlikeBlogPost,
} from "../../controllers/like/likeBlogPostController.mjs";

const likeRouter = express.Router();

likeRouter.post("/api/like/:blogPostId", likeBlogPost);
likeRouter.delete("/api/like/:blogPostId", unlikeBlogPost);

export default likeRouter;
