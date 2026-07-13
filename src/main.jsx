import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "./styles/dashboard.css";
import "./styles/store.css";
import "./styles/customer.css";
import "./styles/inventory.css";
import "./styles/orders.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);