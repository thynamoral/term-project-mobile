import useSWR, { mutate } from "swr";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";

export type BlogPost = {
  _id?: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  topic?: { _id: string; name: string }[];
  image?: string;
  likes: { _id: string }[];
  bookmarks: { _id: string }[];
  readCount: number;
  createdAt?: Date;
};

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const useBlogPosts = () => {
  const { auth } = useAuthStore();

  // Fetch all blog posts
  const {
    data: blogPosts,
    error,
    isLoading: loading,
    mutate: mutateBlogPosts,
  } = useSWR<BlogPost[]>("/api/blogposts", fetcher);

  // Fetch blog posts by the current user
  const {
    data: blogPostUser,
    error: blogPostUserError,
    isLoading: blogPostUserLoading,
    mutate: mutateBlogPostUser,
  } = useSWR<BlogPost[]>(
    auth?.userId ? `/api/blogposts/user/${auth?.userId}` : null,
    fetcher
  );

  // fetch a single blog post by ID
  const fetchBlogPostById = async (id: string) => {
    try {
      const blogPost = await apiClient.get<BlogPost>(`/api/blogposts/${id}`);
      return blogPost.data;
    } catch (err) {
      throw new Error("Failed to fetch blog post");
    }
  };

  return {
    blogPosts,
    blogPostUser,
    loading,
    error,
    fetchBlogPostById,
    mutateBlogPosts,
    mutateBlogPostUser,
  };
};

export default useBlogPosts;
