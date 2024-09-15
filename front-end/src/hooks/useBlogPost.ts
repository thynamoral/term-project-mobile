import { useState } from "react";
import apiClient from "../services/apiClient";

export type BlogPost = {
  _id?: string;
  title: string;
  content: string;
  author: string; // Assuming the author is a user ID
  topic?: string[]; // Array of topic IDs
  createdAt?: Date;
  imageUrl?: string; // If storing image URLs
};

const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all blog posts
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/blogposts");
      setBlogPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blog posts");
      setLoading(false);
    }
  };

  // Fetch a single blog post by ID
  const fetchBlogPostById = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/blogposts/${id}`);
      setCurrentBlogPost(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError("Failed to fetch blog post");
      setLoading(false);
    }
  };

  // Create a new blog post
  const createBlogPost = async (post: FormData) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/api/blogposts", post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogPosts((prevPosts) => [...prevPosts, response.data]);
      setLoading(false);
    } catch (err) {
      setError("Failed to create blog post");
      setLoading(false);
    }
  };

  // Update a blog post
  const updateBlogPost = async (id: string, post: FormData, userId: string) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/api/blogposts/${id}`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // @ts-ignore
        data: { userId },
      });
      setBlogPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === id ? response.data : p))
      );
      setLoading(false);
    } catch (err) {
      setError("Failed to update blog post");
      setLoading(false);
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id: string, userId: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/api/blogposts/${id}`, { data: { userId } });
      setBlogPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));
      setLoading(false);
    } catch (err) {
      setError("Failed to delete blog post");
      setLoading(false);
    }
  };

  return {
    blogPosts,
    currentBlogPost,
    loading,
    error,
    fetchBlogPosts,
    fetchBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
  };
};

export default useBlogPosts;
