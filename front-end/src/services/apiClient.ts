import axios from "axios";

// https://term-project-mobile.onrender.com
// http://localhost:3000

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default apiClient;
