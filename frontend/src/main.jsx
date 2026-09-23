import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Command } from "@tauri-apps/plugin-shell";


import "./index.css";
import "./styles/dashboard.css";
import "./styles/store.css";
import "./styles/customer.css";
import "./styles/inventory.css";
import "./styles/orders.css";
import "./styles/analytics.css";
import "./styles/settings.css";
import "./pages/profile.css";

if (window.__TAURI_INTERNALS__) {
  Command.sidecar("binaries/artisansuite-backend")
    .spawn()
    .then(() => console.log("Backend started"))
    .catch((error) => console.error("Backend failed to start:", error));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);