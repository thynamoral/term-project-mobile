import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";

export type BlogPost = {
  _id?: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  topic?: { _id: string; name: string }[];
  createdAt?: Date;
  image?: string;
};

const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPostUser, setBlogPostUser] = useState<BlogPost[]>([]);
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { auth } = useAuthStore();

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

  const fetchBlogPostByUserId = useCallback(async () => {
    try {
      setLoading(true);
      if (auth?.userId) {
        const response = await apiClient.get<BlogPost[]>(
          `/api/blogposts/user/${auth?.userId}`
        );
        setBlogPostUser(response.data);
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch blog posts");
      setLoading(false);
    }
  }, [auth?.userId]);

  // Create a new blog post
  const createBlogPost = async (post: FormData) => {
    try {
      setLoading(true);
      const res = await apiClient.post<BlogPost>("/api/blogposts", post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogPostUser((prevPosts) => [...prevPosts, res.data]);
      setLoading(false);
    } catch (err) {
      setError("Failed to create blog post");
      setLoading(false);
    }
  };

  // Update a blog post
  const updateBlogPost = async (id: string, post: FormData) => {
    try {
      setLoading(true);
      const res = await apiClient.put<BlogPost>(`/api/blogposts/${id}`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setBlogPostUser((prevPosts) =>
        prevPosts.map((p) => (p._id === id ? res.data : p))
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
      await apiClient.delete(`/api/blogposts/${id}`, {
        data: { userId },
      });
      setBlogPostUser((prevPosts) => prevPosts.filter((p) => p._id !== id));
      setLoading(false);
    } catch (err) {
      setError("Failed to delete blog post");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    fetchBlogPostByUserId();
  }, [auth?.userId]);

  return {
    blogPosts,
    blogPostUser,
    currentBlogPost,
    loading,
    error,
    fetchBlogPosts,
    fetchBlogPostById,
    fetchBlogPostByUserId,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
  };
};

export default useBlogPosts;
