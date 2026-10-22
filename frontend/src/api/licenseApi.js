import api from "./api";

export const getLicenseStatus = () => api.get("/license/status");

export const activateLicense = (licenseKey) =>
  api.post("/license/activate", { licenseKey });