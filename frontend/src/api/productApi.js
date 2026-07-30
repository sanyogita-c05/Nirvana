import api from "./api";

export const getProducts = () => api.get("/products");

export const getProduct = (id) =>
  api.get(`/products/${id}`);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);

// Content-Type is deliberately NOT set here — when the body is a FormData
// instance, axios (and the browser under it) auto-generates
// "multipart/form-data; boundary=..." with the correct boundary. Setting
// the header manually strips that boundary and the backend can't parse
// the request at all.
export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);

export const createProduct = (data) =>
  api.post("/products", data);