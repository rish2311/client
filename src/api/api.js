import axios from "axios";

const API = axios.create({
  baseURL: "https://blogserver-eight.vercel.app/api",
});

// Add JWT token to requests izf available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
