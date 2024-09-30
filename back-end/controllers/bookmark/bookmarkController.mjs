import BlogPost from "../../models/BlogPost.mjs";
import User from "../../models/User.mjs";

export const bookmarkPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const userId = req.user.id;

    const post = await BlogPost.findById(blogPostId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    // Check if user has already bookmarked the post
    if (user.bookmarkedPosts.includes(blogPostId)) {
      return res.status(400).json({ message: "Post already bookmarked" });
    }

    // Add post to user's bookmarkedPosts
    user.bookmarkedPosts.push(blogPostId);
    await user.save();

    // Add user to post's bookmarks
    post.bookmarks.push(userId);
    await post.save();

    res.status(200).json({ message: "Post bookmarked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unbookmarkPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const userId = req.user.id;

    const post = await BlogPost.findById(blogPostId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    // Remove post from user's bookmarkedPosts
    user.bookmarkedPosts = user.bookmarkedPosts.filter(
      (id) => id.toString() !== blogPostId
    );
    await user.save();

    // Remove user from post's bookmarks
    post.bookmarks = post.bookmarks.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Post unbookmarked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
