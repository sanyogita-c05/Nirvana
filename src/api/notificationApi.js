import api from "./api";

export const getNotifications = () => api.get("/notifications");

export const markNotificationRead = (id) =>
  api.put(`/notifications/${id}/read`);

export const markAllNotificationsRead = () =>
  api.put("/notifications/mark-all-read");

export const deleteNotification = (id) =>
  api.delete(`/notifications/${id}`);

export const clearAllNotifications = () =>
  api.delete("/notifications/clear-all");