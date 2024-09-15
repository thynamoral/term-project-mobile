// hooks/useUserBlogPosts.ts
import { useState, useEffect } from "react";
import { BlogPost } from "./useBlogPost";
import apiClient from "../services/apiClient";

const useBlogPostUser = (userId: string) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      if (!userId) {
        setBlogPosts([]);
      } else {
        setLoading(true);
        const response = await apiClient.get<BlogPost[]>(
          `/api/blogposts/user/${userId}`
        );
        setBlogPosts(response.data);
      }
    } catch (err) {
      setError("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogPosts();
  }, [userId]);

  const refetchBlogPostUser = async () => {
    await fetchBlogPosts();
  };

  return { blogPosts, loading, error, refetchBlogPostUser };
};

export default useBlogPostUser;
