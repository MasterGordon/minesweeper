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
import Collection from "./views/collection/Collection.tsx";
import { AnimatePresence } from "motion/react";
import Store from "./views/store/Store.tsx";
import Profile from "./views/profile/Profile.tsx";
import { useWSQuery } from "./hooks.ts";
import RegisterButton from "./components/Auth/RegisterButton.tsx";

const ProtectedRoute: React.FC<{
  component: React.ComponentType<any>;
  path: string;
}> = ({ component: Component, path }) => {
  const { data: username, isLoading } = useWSQuery("user.getSelf", null);

  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) return null;
        if (!username) {
          return (
            <div className="flex flex-col items-center justify-center py-24 gap-6">
              <h2 className="text-white/90 text-2xl font-bold">
                This page is only available to logged-in users.
              </h2>
              <RegisterButton label="Login to access" />
            </div>
          );
        }
        return <Component {...params} />;
      }}
    </Route>
  );
};

const setup = async () => {
  const token = localStorage.getItem("loginToken");

  if (token) {
    try {
      const res = await wsClient.dispatch("user.loginWithToken", {
        token: JSON.parse(token),
      });
      if (!res.success) {
        localStorage.removeItem("loginToken");
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem("loginToken");
    }
  }
};

setup().then(() => {
  return createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Shell>
          <AnimatePresence mode="wait">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/play/:gameId?">
                {(params) => <Endless gameId={params.gameId} />}
              </Route>
              <ProtectedRoute path="/history" component={MatchHistory} />
              <ProtectedRoute path="/settings" component={Settings} />
              <ProtectedRoute path="/collection" component={Collection} />
              <Route path="/store" component={Store} />
              <Route path="/profile/:username?">
                {(params) => <Profile username={params.username} />}
              </Route>
            </Switch>
          </AnimatePresence>
        </Shell>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
