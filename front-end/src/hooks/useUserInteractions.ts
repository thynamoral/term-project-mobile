import useSWR from "swr";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";
import useBlogPosts from "./useBlogPost";
import useBookmarkedBlogPost from "./useBookmarkedBlogPost";

// Custom fetcher to handle requests with a body
const fetcher = async (url: string) => {
  const response = await apiClient.get(url); // GET request
  return response.data;
};

const useUserInteractions = (blogPostId: string) => {
  const { auth } = useAuthStore();
  const { mutateBlogPosts, mutateBlogPostUser } = useBlogPosts();
  const { mutateBookmarkedBlogPosts } = useBookmarkedBlogPost();

  // Fetch user's interaction with the blog post
  const { data, error, mutate } = useSWR(
    auth?.userId
      ? `/api/userInteractions?blogPostId=${blogPostId}&userId=${auth.userId}`
      : null,
    fetcher
  );

  // Fetch the total number of likes for the blog post
  const {
    data: totalLikesData,
    error: totalLikesError,
    mutate: mutateTotalLikes,
  } = useSWR<{ totalLikes: number }>(
    `/api/blogposts/totalLikes/${blogPostId}`,
    fetcher
  );

  const {
    data: totalBookmarksData,
    error: totalBookmarksError,
    mutate: mutateTotalBookmarks,
  } = useSWR<{ totalBookmarks: number }>(
    `/api/blogposts/totalBookmarks/${blogPostId}`,
    fetcher
  );

  const likedBlogPosts = data?.hasLiked ?? null;
  const bookmarkedBlogPosts = data?.hasBookmarked ?? null;
  const totalLikes = totalLikesData?.totalLikes ?? 0;
  const totalBookmarks = totalBookmarksData?.totalBookmarks ?? 0;

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
          mutateTotalLikes(
            { totalLikes: totalLikes + 1 },
            false // Optimistically update totalLikes
          );
          // Mutate the blog post cache
          mutateBlogPosts();
          mutateBlogPostUser();
          mutateBookmarkedBlogPosts();
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
          mutateTotalLikes(
            { totalLikes: totalLikes - 1 },
            false // Optimistically update totalLikes
          );
          // Mutate the blog post cache
          mutateBlogPosts();
          mutateBlogPostUser();
          mutateBookmarkedBlogPosts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkBlogPost = async (blogPostId: string) => {
    try {
      if (auth?.userId) {
        const response = await apiClient.post(`/api/bookmark/${blogPostId}`, {
          userId: auth?.userId,
        });
        if (response.status === 200) {
          // Mutate the data to reflect the new bookmark status
          mutate(
            { ...data, hasBookmarked: true },
            false // Avoid refetch, manually update the state
          );
          mutateTotalBookmarks(
            { totalBookmarks: totalBookmarks + 1 },
            false // Optimistically update totalBookmarks
          );
          // Mutate the blog post cache
          mutateBlogPosts();
          mutateBlogPostUser();
          mutateBookmarkedBlogPosts();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unbookmarkBlogPost = async (blogPostId: string) => {
    try {
      if (auth?.userId) {
        const response = await apiClient.delete(
          `/api/bookmark/${blogPostId}?userId=${auth.userId}`
        );
        if (response.status === 200) {
          // Mutate the data to reflect the new unbookmark status
          mutate(
            { ...data, hasBookmarked: false },
            false // Avoid refetch, manually update the state
          );
          mutateTotalBookmarks(
            { totalBookmarks: totalBookmarks - 1 },
            false // Optimistically update totalBookmarks
          );
          // Mutate the blog post cache
          mutateBlogPosts();
          mutateBlogPostUser();
          mutateBookmarkedBlogPosts();
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
    bookmarkBlogPost,
    unbookmarkBlogPost,
    totalLikes,
    totalBookmarks,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserInteractions;
