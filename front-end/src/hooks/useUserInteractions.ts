import useSWR from "swr";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";
import { useEffect, useState } from "react";

// Custom fetcher to handle requests with a body
const fetcher = async (url: string) => {
  const response = await apiClient.get(url); // GET request
  return response.data;
};

const useUserInteractions = (blogPostId: string) => {
  const { auth } = useAuthStore();

  const { data, error, mutate } = useSWR(
    auth?.userId
      ? `/api/userInteractions?blogPostId=${blogPostId}&userId=${auth.userId}`
      : null,
    fetcher
  );

  const {
    data: totalLikes,
    error: totalLikesError,
    mutate: mutateTotalLikes,
  } = useSWR(`/api/blogposts/totalLikes/${blogPostId}`, fetcher);

  const likedBlogPosts = data?.hasLiked ?? null;
  const bookmarkedBlogPosts = data?.hasBookmarked ?? null;

  const likeBlogPost = async (blogPostId: string) => {
    try {
      if (auth?.userId) {
        const response = await apiClient.post(`/api/like/${blogPostId}`, {
          userId: auth?.userId,
        });
        if (response.status === 200) {
          // Mutate the data to reflect the new like status
          mutate(
            { ...data, hasLiked: true },
            false // Avoid refetch, manually update the state
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeBlogPost = async (blogPostId: string) => {
    try {
      if (auth?.userId) {
        const response = await apiClient.delete(
          `/api/like/${blogPostId}?userId=${auth.userId}`
        );
        if (response.status === 200) {
          // Mutate the data to reflect the new unlike status
          mutate(
            { ...data, hasLiked: false },
            false // Avoid refetch, manually update the state
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    likedBlogPosts,
    bookmarkedBlogPosts,
    likeBlogPost,
    unlikeBlogPost,
    totalLikes,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserInteractions;
