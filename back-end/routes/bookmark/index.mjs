import express from "express";
import {
  bookmarkPost,
  unbookmarkPost,
  getTotalBookmarks,
} from "../../controllers/bookmark/bookmarkController.mjs";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/api/bookmark/:blogPostId", bookmarkPost);
bookmarkRouter.delete("/api/bookmark/:blogPostId", unbookmarkPost);
bookmarkRouter.get(
  "/api/blogposts/totalBookmarks/:blogPostId",
  getTotalBookmarks
);

export default bookmarkRouter;
