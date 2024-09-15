import express from "express";
import {
  createTopic,
  getAllTopics,
  getTopicById,
} from "../../controllers/topic/topicController.mjs";

const topicRoute = express.Router();

// Create a new topic
topicRoute.post("/api/topics", createTopic);

// Get all topics
topicRoute.get("/api/topics", getAllTopics);

// Get a single topic by ID
topicRoute.get("/api/topics/:id", getTopicById);

export default topicRoute;
