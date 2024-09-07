import axios from "axios";

// https://term-project-mobile-1ia4.vercel.app

const apiClient = axios.create({
  baseURL: "http//localhost:3000",
  withCredentials: true,
});

export default apiClient;
