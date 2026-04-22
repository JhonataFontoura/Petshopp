import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./App.jsx";
import "./index.css"; // opcional (Tailwind ou estilos globais)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);