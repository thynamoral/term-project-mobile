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
  const { data: blogPostUser } = useSWR<BlogPost[]>(
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

  // Create a new blog post
  const createBlogPost = async (post: FormData) => {
    try {
      const res = await apiClient.post<BlogPost>("/api/blogposts", post, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mutate("/api/blogposts", [...(blogPosts || []), res.data], false);

      if (auth?.userId) {
        mutate(
          `/api/blogposts/user/${auth.userId}`,
          [...(blogPostUser || []), res.data], // Add the new post to the user's blogPosts cache
          false
        );
      }

      // Revalidate all blog posts after mutation
      mutate("/api/blogposts");
      mutate(`/api/blogposts/user/${auth?.userId}`);
    } catch (err) {
      throw new Error("Failed to create blog post");
    }
  };

  // Update a blog post
  const updateBlogPost = async (id: string, post: FormData) => {
    try {
      const res = await apiClient.put<BlogPost>(`/api/blogposts/${id}`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      mutate(
        `/api/blogposts`,
        blogPosts?.map((p) => (p._id === id ? res.data : p)), // Update the blog post in the blogPosts cache
        false
      );

      if (auth?.userId) {
        mutate(
          `/api/blogposts/user/${auth.userId}`,
          blogPostUser?.map((p) => (p._id === id ? res.data : p)), // Update the blog post in the user's blogPosts cache
          false
        );
      }

      // Revalidate all blog posts after mutation
      mutate("/api/blogposts");
      mutate(`/api/blogposts/user/${auth?.userId}`);
    } catch (err) {
      throw new Error("Failed to update blog post");
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id: string, userId: string) => {
    try {
      await apiClient.delete(`/api/blogposts/${id}`, { data: { userId } });

      mutate(
        "/api/blogposts",
        blogPosts?.filter((p) => p._id !== id), // Remove the blog post from the blogPosts cache
        false
      );

      if (auth?.userId) {
        mutate(
          `/api/blogposts/user/${auth.userId}`,
          blogPostUser?.filter((p) => p._id !== id), // Remove the blog post from the user's blogPosts cache
          false
        );
      }

      // Revalidate all blog posts after deletion
      mutate("/api/blogposts");
      mutate(`/api/blogposts/user/${auth?.userId}`);
    } catch (err) {
      throw new Error("Failed to delete blog post");
    }
  };

  return {
    blogPosts,
    blogPostUser,
    loading,
    error,
    fetchBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    mutateBlogPosts,
  };
};

export default useBlogPosts;
