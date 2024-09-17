import BlogPost from "../../models/BlogPost.mjs";
import User from "../../models/User.mjs";
import Topic from "../../models/Topic.mjs";
import multer from "multer";
import dotenv from "dotenv";
import { uploadToS3 } from "../../configs/connectAWS.mjs";
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// CREATE a blog post
export const createBlogPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    const { title, content, authorId, topicIds } = req.body;

    try {
      const author = await User.findById(authorId);
      if (!author) return res.status(404).json({ message: "User not found" });

      let imageUrl = null;
      if (req.file) {
        // upload image to S3
        imageUrl = await uploadToS3(req.file);
      }

      const blogPost = new BlogPost({
        title,
        content,
        author: author._id,
        topic: topicIds,
        image: imageUrl, // Save image URL from S3
      });

      const savedPost = await blogPost.save();

      // Update the topics
      if (topicIds) {
        await Topic.updateMany(
          { _id: { $in: topicIds } },
          { $push: { blogPosts: savedPost._id } }
        );
      }

      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// READ all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find()
      .populate("author")
      .populate("topic");
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single blog post
export const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
      .populate("author")
      .populate("topic");
    if (!blogPost)
      return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a blog post
export const updateBlogPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    const { title, content, topicIds } = req.body;

    try {
      const blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost)
        return res.status(404).json({ message: "Blog post not found" });

      blogPost.title = title || blogPost.title;
      blogPost.content = content || blogPost.content;
      blogPost.topic = topicIds || blogPost.topic;

      if (req.file) {
        // Delete old image from S3
        if (blogPost.image) {
          const oldImageKey = blogPost.image.split("/").pop();
          const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: oldImageKey,
          };
          s3.send(new DeleteObjectCommand(params), (err) => {
            if (err) {
              console.log("Error deleting old image from S3:", err);
            }
          });
        }
        blogPost.image = await uploadToS3(req.file); // Save new image URL from S3
      }

      const updatedPost = await blogPost.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// DELETE a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the blog post to ensure it belongs to the current user
    const blogPost = await BlogPost.findOne({ _id: id, author: userId }).exec();

    if (!blogPost) {
      return res
        .status(404)
        .json({ message: "Blog post not found or not authorized to delete." });
    }

    // Delete image from S3 if exists
    if (blogPost.image) {
      const imageKey = blogPost.image.split("/").pop();
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageKey,
      };
      s3.send(new DeleteObjectCommand(params), (err) => {
        if (err) {
          console.log("Error deleting image from S3:", err);
        }
      });
    }

    // Remove blog post references from related topics
    if (blogPost.topic) {
      await Topic.updateMany(
        { _id: { $in: blogPost.topic } },
        { $pull: { blogPosts: blogPost._id } }
      );
    }

    await blogPost.deleteOne();
    res.status(200).json({ message: "Blog post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller method to get all blog posts for a specific user
export const getBlogPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    const blogPosts = await BlogPost.find({ author: userId }).populate("topic"); // Fetch posts and populate topic
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
