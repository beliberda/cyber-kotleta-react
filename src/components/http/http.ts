import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
const $api = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API_URL,
  headers: headers,
});

$api.interceptors.request.use((config) => {
  config.timeout = 1000;
  return config;
});

export { $api };
