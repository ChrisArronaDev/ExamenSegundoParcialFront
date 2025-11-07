import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";
import "bootstrap/dist/css/bootstrap.min.css";

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log("✅ App lista para funcionar sin conexión");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
