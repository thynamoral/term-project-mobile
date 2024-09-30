import express from "express";
import {
  bookmarkPost,
  unbookmarkPost,
} from "../../controllers/bookmark/bookmarkController.mjs";

const bookmarkRouter = express.Router();

bookmarkRouter.post("api/bookmark/:blogPostId", bookmarkPost);
bookmarkRouter.delete("api/bookmark/:blogPostId", unbookmarkPost);

export default bookmarkRouter;
