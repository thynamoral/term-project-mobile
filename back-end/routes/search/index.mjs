import express from "express";
import { searchBlogPosts } from "../../controllers/search/searchController.mjs";

const searchRouter = express.Router();

searchRouter.get("/api/search", searchBlogPosts);

export default searchRouter;
