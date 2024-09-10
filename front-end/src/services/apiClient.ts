import axios from "axios";

// https://term-project-mobile.onrender.com

const apiClient = axios.create({
  baseURL: "https://term-project-mobile.onrender.com",
});

export default apiClient;
