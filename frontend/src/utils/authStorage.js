// Central place for login persistence.
//
// token/user always live in localStorage (so every existing file that reads
// localStorage.getItem("token") keeps working). "Keep me signed in" is
// remembered with a flag:
//   rememberMe = "true"  -> session survives closing the app/browser
//   rememberMe = "false" -> session ends when the window is closed
//                           (detected via a sessionStorage marker, which the
//                           browser wipes when the window closes)
//   rememberMe missing   -> logged in before this change; treated as remembered

const REMEMBER_KEY = "rememberMe";
const SESSION_MARKER = "sessionActive";

export const saveAuth = ({ token, user, rememberMe }) => {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem(REMEMBER_KEY, rememberMe ? "true" : "false");
  sessionStorage.setItem(SESSION_MARKER, "1");
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(SESSION_MARKER);
};

const isExpired = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(base64));
    return !exp || exp * 1000 < Date.now();
  } catch {
    return true; // unreadable token -> treat as invalid
  }
};

export const hasValidSession = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  if (isExpired(token)) {
    clearAuth();
    return false;
  }

  const remember = localStorage.getItem(REMEMBER_KEY) !== "false";
  const sessionAlive = sessionStorage.getItem(SESSION_MARKER) === "1";

  if (!remember && !sessionAlive) {
    clearAuth();
    return false;
  }

  return true;
};