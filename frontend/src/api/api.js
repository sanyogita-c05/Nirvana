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

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

const LICENSE_CODES = [
  "TRIAL_EXPIRED",
  "LICENSE_EXPIRED",
  "LICENSE_INVALID",
  "LICENSE_WRONG_DEVICE",
  "LICENSE_NOT_YET_VALID",
  "CLOCK_TAMPERED",
  "LICENSE_VERIFICATION_FAILED",
];

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();

    if (MUTATING_METHODS.includes(method) && response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    // License lock: send the user to /license. No logout, no generic error toast.
    const data = error.response?.data;
    if (error.response?.status === 403 && LICENSE_CODES.includes(data?.code)) {
      const detail = {
        code: data.code,
        message: data.message,
        validUntil: data.validUntil,
      };
      sessionStorage.setItem("licenseBlock", JSON.stringify(detail));
      window.dispatchEvent(new CustomEvent("license:blocked", { detail }));
      error.isLicenseError = true;
      return Promise.reject(error);
    }

    const method = error.config?.method?.toLowerCase();
    const message =
      data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    if (MUTATING_METHODS.includes(method)) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;