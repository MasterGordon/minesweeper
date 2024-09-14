import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameProvider } from "./GameContext.tsx";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>,
);
