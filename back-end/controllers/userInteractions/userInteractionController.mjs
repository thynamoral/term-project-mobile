import BlogPost from "../../models/BlogPost.mjs";
import User from "../../models/User.mjs";

export const checkUserInteractions = async (req, res) => {
  try {
    const { blogPostId, userId } = req.query;

    // Validate userId and blogPostId
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });
    if (!blogPostId)
      return res.status(400).json({ message: "Blog Post ID is required" });

    // Find the user and populate their liked and bookmarked posts
    const user = await User.findById(userId)
      .select("likedPosts bookmarkedPosts")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the blog post exists
    const blogPost = await BlogPost.findById(blogPostId).lean();

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Check if the user has liked the post
    const hasLiked = user.likedPosts.some(
      (postId) => postId.toString() === blogPostId
    );

    // Check if the user has bookmarked the post
    const hasBookmarked = user.bookmarkedPosts.some(
      (postId) => postId.toString() === blogPostId
    );

    res.status(200).json({
      hasLiked,
      hasBookmarked,
    });
  } catch (error) {
    console.error("Error in checkUserInteractions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
