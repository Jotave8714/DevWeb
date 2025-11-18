// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // URL do seu backend
});

// 🔒 Intercepta erros para debug
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Erro na API:", err.response?.data || err.message);
    throw err;
  }
);

export default API;
