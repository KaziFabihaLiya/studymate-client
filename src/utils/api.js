// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://study-mate-server-six.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
