import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { connectWS } from "./ws.ts";
import { Toaster } from "react-hot-toast";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

connectWS();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </StrictMode>,
);
