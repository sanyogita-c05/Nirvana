import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/products",
});

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const multipartHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
    },
});

export const createProduct = (formData) =>
    API.post("/", formData, multipartHeader());

export const getProducts = () =>
    API.get("/", authHeader());

export const getProductById = (id) =>
    API.get(`/${id}`, authHeader());

export const updateProduct = (id, formData) =>
    API.put(`/${id}`, formData, multipartHeader());

export const deleteProduct = (id) =>
    API.delete(`/${id}`, authHeader());

export default API;