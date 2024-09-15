import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

type Topic = {
  _id: string;
  name: string;
};

const useTopic = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [singleTopic, setSingleTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all topics
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<Topic[]>("/api/topics");
      setTopics(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch topics");
      setLoading(false);
    }
  };

  // Fetch a single topic by ID
  const fetchSingleTopic = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get<Topic>(`/api/topics/${id}`);
      setSingleTopic(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch topic");
      setLoading(false);
    }
  };

  // Add new topic
  const addTopic = async (name: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post<Topic>("/api/topics", { name });
      setTopics((prevTopics) => [...prevTopics, response.data]);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError("Failed to add topic");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return {
    topics,
    singleTopic,
    loading,
    error,
    fetchTopics,
    fetchSingleTopic,
    addTopic,
  };
};

export default useTopic;
