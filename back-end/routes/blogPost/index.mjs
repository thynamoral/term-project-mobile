import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostsByUser,
  getBookmarkedBlogPosts,
  updateReadCount,
} from "../../controllers/blogPost/blogPostController.mjs";

const blogPostRouter = express.Router();

blogPostRouter.post("/api/blogposts", createBlogPost);
blogPostRouter.get("/api/blogposts", getAllBlogPosts);
blogPostRouter.get("/api/blogposts/:id", getBlogPostById);
blogPostRouter.put("/api/blogposts/:id", updateBlogPost);
blogPostRouter.delete("/api/blogposts/:id", deleteBlogPost);
blogPostRouter.get("/api/blogposts/user/:userId", getBlogPostsByUser);
blogPostRouter.get(
  "/api/blogposts/user/:userId/bookmarks",
  getBookmarkedBlogPosts
);
blogPostRouter.put("/api/blogposts/:id/readCount", updateReadCount);

export default blogPostRouter;
