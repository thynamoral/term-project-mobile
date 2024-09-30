import BlogPost from "../../models/BlogPost.mjs";
import User from "../../models/User.mjs";

export const getTotleLikes = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const blogPost = await BlogPost.findById(blogPostId);
    const totalLikes = blogPost.likes.length;
    res.status(200).json({ totalLikes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const likeBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const blogPost = await BlogPost.findById(blogPostId);
    const user = await User.findById(userId);

    if (!blogPost || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    // Check if user has already liked the post
    if (user.likedPosts.includes(blogPostId)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    // Add post to user's likedPosts
    user.likedPosts.push(blogPostId);
    await user.save();

    // Add user to post's likes
    blogPost.likes.push(userId);
    await blogPost.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking blog post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const unlikeBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { userId } = req.query;

    // Validate that both userId and blogPostId are provided
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });
    if (!blogPostId)
      return res.status(400).json({ message: "Blog Post ID is required" });

    const post = await BlogPost.findById(blogPostId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    // Remove post from user's likedPosts
    user.likedPosts = user.likedPosts.filter(
      (id) => id.toString() !== blogPostId
    );
    await user.save();

    // Remove user from post's likes
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
