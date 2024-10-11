import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import Shell from "./Shell.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { wsClient } from "./wsClient.ts";
import { Route, Switch } from "wouter";
import Endless from "./views/endless/Endless.tsx";
import { queryClient } from "./queryClient.ts";
import Home from "./views/home/Home.tsx";
import Settings from "./views/settings/Settings.tsx";
import MatchHistory from "./views/match-history/MatchHistory.tsx";

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
        <Shell>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/play/:gameId?">
              {(params) => <Endless gameId={params.gameId} />}
            </Route>
            <Route path="/history" component={MatchHistory} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Shell>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
