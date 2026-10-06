// Small helper so components that read the logged-in user from localStorage
// can also react immediately when it changes elsewhere on the same page —
// e.g. Settings saving a new studio name should update Sidebar/Topbar
// without needing a full page refresh. localStorage's native "storage"
// event only fires in OTHER tabs, never the tab that made the change,
// so we dispatch our own CustomEvent here to cover the same-tab case.

const EVENT_NAME = "artisan:user-updated";

export function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        return null;
    }
}

// Merges the given fields into the cached user and notifies listeners.
export function setStoredUser(fields) {
    const existing = getStoredUser() || {};
    const updated = { ...existing, ...fields };
    localStorage.setItem("user", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));
    return updated;
}

// Call on logout — clears both token and user, and notifies listeners.
export function clearStoredUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));
}

// Subscribe to changes. Returns an unsubscribe function — call it in a
// useEffect cleanup. `callback` receives the updated user object (or null).
export function onUserUpdated(callback) {
    const handler = (e) => callback(e.detail);
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
}