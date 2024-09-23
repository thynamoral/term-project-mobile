import BlogPost from "../../models/BlogPost.mjs";
import User from "../../models/User.mjs";
import Topic from "../../models/Topic.mjs";

export const searchBlogPosts = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    // Find users by username
    const users = await User.find({
      username: { $regex: searchTerm, $options: "i" },
    }).select("_id");

    // Find topics by name
    const topics = await Topic.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("_id");

    // Search blog posts by title, content, author (from users), or topic
    const results = await BlogPost.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
        { author: { $in: users.map((user) => user._id) } },
        { topic: { $in: topics.map((topic) => topic._id) } },
      ],
    })
      .populate("author")
      .populate("topic")
      .exec();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error searching blog posts", error });
  }
};
