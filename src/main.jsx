import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Or use 'antd/dist/reset.css' for the modern reset

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
