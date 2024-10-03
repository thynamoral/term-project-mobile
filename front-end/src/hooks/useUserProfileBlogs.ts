import useSWR, { mutate } from "swr";
import apiClient from "../services/apiClient";
import useBlogPost, { BlogPost } from "./useBlogPost";
import useAuthStore from "./useAuthStore";
import { useEffect } from "react";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const useUserProfileBlogs = () => {
  const { auth } = useAuthStore();
  const { blogPosts, mutateBlogPosts } = useBlogPost();

  // Fetch blog posts by the current user
  const {
    data: blogPostUser,
    error: blogPostUserError,
    isLoading: blogPostUserLoading,
    mutate: mutateBlogPostUser,
  } = useSWR<BlogPost[]>(
    auth?.userId ? `/api/blogposts/user/${auth.userId}` : null,
    fetcher
  );

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

  // Update the read count of a blog post
  const updateReadCount = async (id: string) => {
    try {
      await apiClient.put(`/api/blogposts/${id}/readCount`);
      mutateBlogPosts();
      mutateBlogPostUser();
    } catch (err) {
      throw new Error("Failed to update read count");
    }
  };

  return {
    blogPostUser,
    blogPostUserError,
    blogPostUserLoading,
    mutateBlogPostUser,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateReadCount,
  };
};

export default useUserProfileBlogs;
