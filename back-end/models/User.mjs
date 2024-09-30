import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
    },
  ],
  bookmarkedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
    },
  ],
});

export default mongoose.model("User", userSchema);
