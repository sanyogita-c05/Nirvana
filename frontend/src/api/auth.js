
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getMe = (token) => API.get("/me", authHeader(token));
export const changePassword = (data, token) =>
  API.put("/change-password", data, authHeader(token));

export default API;
