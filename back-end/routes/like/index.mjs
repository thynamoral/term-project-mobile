import express from "express";
import {
  likeBlogPost,
  unlikeBlogPost,
  getTotleLikes,
} from "../../controllers/like/likeBlogPostController.mjs";

const likeRouter = express.Router();

likeRouter.post("/api/like/:blogPostId", likeBlogPost);
likeRouter.delete("/api/like/:blogPostId", unlikeBlogPost);
likeRouter.get("/api/blogposts/totalLikes/:blogPostId", getTotleLikes);

export default likeRouter;
