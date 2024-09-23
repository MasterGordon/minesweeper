import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { connectWS } from "./ws.ts";
import { Toaster } from "react-hot-toast";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Shell from "./Shell.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

connectWS();

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <Shell />
      {/* <App /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
