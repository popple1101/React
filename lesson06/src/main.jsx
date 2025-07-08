import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Schedules from "./Schedules.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Schedules />
  </StrictMode>
);
