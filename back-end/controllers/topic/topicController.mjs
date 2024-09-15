import Topic from "../../models/Topic.mjs";

// Create a new Topic
export const createTopic = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the topic already exists
    const existingTopic = await Topic.findOne({ name });
    if (existingTopic) {
      return res.status(400).json({ message: "Topic already exists" });
    }

    const newTopic = new Topic({ name });
    await newTopic.save();

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Topics
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Topic by ID
export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id).populate("blogPosts");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
