import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { connectWS } from "./ws.ts";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import Shell from "./Shell.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { wsClient } from "./wsClient.ts";
import { Route, Switch } from "wouter";
import Endless from "./views/endless/Endless.tsx";
import { queryClient } from "./queryClient.ts";

connectWS();

const setup = async () => {
  const token = localStorage.getItem("loginToken");

  if (token) {
    try {
      await wsClient.dispatch("user.loginWithToken", {
        token: JSON.parse(token),
      });
    } catch (e) {
      console.error(e);
    }
  }
};

setup().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <Shell>
          <Switch>
            <Route path="/play" component={Endless} />
          </Switch>
          {/* <App /> */}
        </Shell>
        {/* <App /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
