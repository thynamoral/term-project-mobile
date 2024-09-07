import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://term-project-mobile-1ia4.vercel.app",
  withCredentials: true,
});

export default apiClient;
