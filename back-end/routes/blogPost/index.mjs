import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostsByUser,
} from "../../controllers/blogPost/blogPostController.mjs";

const blogPostRouter = express.Router();

blogPostRouter.post("/api/blogposts", createBlogPost);
blogPostRouter.get("/api/blogposts", getAllBlogPosts);
blogPostRouter.get("/api/blogposts/:id", getBlogPostById);
blogPostRouter.put("/api/blogposts/:id", updateBlogPost);
blogPostRouter.delete("/api/blogposts/:id", deleteBlogPost);
blogPostRouter.get("/api/blogposts/user/:userId", getBlogPostsByUser);

export default blogPostRouter;
