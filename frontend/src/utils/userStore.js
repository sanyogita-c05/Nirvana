export const setStoredUser = (updates) => {
  try {
    const existing = JSON.parse(localStorage.getItem("user") || "{}");

    const updated = {
      ...existing,
      ...updates,
    };

    localStorage.setItem("user", JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to update stored user:", error);
  }
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error("Failed to get stored user:", error);
    return {};
  }
};

export const clearStoredUser = () => {
  localStorage.removeItem("user");
};