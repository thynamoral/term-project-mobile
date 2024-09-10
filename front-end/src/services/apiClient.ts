import axios from "axios";

// https://term-project-mobile-1ia4.vercel.app
// https://term-project-mobile.up.railway.app

const apiClient = axios.create({
  baseURL: "https://term-project-mobile.up.railway.app",
  // withCredentials: true,
});

export default apiClient;
