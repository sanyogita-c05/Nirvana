import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//new

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();

    if (MUTATING_METHODS.includes(method) && response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    const method = error.config?.method?.toLowerCase();
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    if (MUTATING_METHODS.includes(method)) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;