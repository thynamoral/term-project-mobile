import { useState, useEffect, useRef } from "react";
import { BlogPost } from "./useBlogPost";
import apiClient from "../services/apiClient";

const useSearchBlogPost = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Debounce logic
    const handler = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults(searchTerm);
      } else {
        // Reset blog posts when search term is empty
        setBlogPosts([]);
      }
    }, 200); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancel the ongoing request
      }
    };
  }, [searchTerm]);

  // Fetch all search results
  const fetchSearchResults = async (term: string) => {
    try {
      abortControllerRef.current = new AbortController(); // Create a new AbortController
      setLoading(true);
      const res = await apiClient.get<BlogPost[]>(
        `/api/search?searchTerm=${term}`,
        {
          signal: abortControllerRef.current.signal, // Pass the signal to the request
        }
      );
      const data = res.data;
      setBlogPosts(data);
      setLoading(false);
    } catch (err) {
      // @ts-ignore
      if (err.name === "AbortError") {
        // Handle request cancellation
        console.log("Request was canceled");
      } else {
        setError("Failed to fetch search results");
      }
      setLoading(false);
    }
  };

  // Update the search term from the component using this function
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return {
    blogPosts,
    loading,
    error,
    updateSearchTerm,
  };
};

export default useSearchBlogPost;
