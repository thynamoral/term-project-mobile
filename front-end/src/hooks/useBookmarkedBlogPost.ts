import useSWR from "swr";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";
import { BlogPost } from "./useBlogPost";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const useBookmarkedBlogPost = () => {
  const { auth } = useAuthStore();

  // get all bookmarked blog posts
  const { data, error, isLoading, mutate } = useSWR<BlogPost[]>(
    auth?.userId ? `/api/blogposts/user/${auth.userId}/bookmarks` : null,
    fetcher
  );

  return {
    bookmarkedBlogPosts: data,
    isLoading,
    error,
    mutateBookmarkedBlogPosts: mutate,
  };
};

export default useBookmarkedBlogPost;
