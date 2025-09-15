import type { Routes } from "../backend/router";
import type { Events } from "../shared/events";
import { queryClient } from "./queryClient";
import { connectionStatusAtom } from "./atoms";
import { getDefaultStore } from "jotai";

const connectionString = import.meta.env.DEV
  ? "ws://localhost:8072/ws"
  : "wss://mbv2.gordon.business/ws";

const messageListeners = new Set<(event: MessageEvent) => void>();
export const addMessageListener = (listener: (event: MessageEvent) => void) => {
  messageListeners.add(listener);
};
export const removeMessageListener = (
  listener: (event: MessageEvent) => void,
) => {
  messageListeners.delete(listener);
};

const emitMessage = (event: MessageEvent) => {
  messageListeners.forEach((listener) => listener(event));
};

const createWSClient = () => {
  const store = getDefaultStore();
  let ws = new WebSocket(connectionString);
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  let heartbeatInterval: number | null = null;
  let heartbeatTimeoutId: number | null = null;
  const HEARTBEAT_INTERVAL = 30000; // 30 seconds
  const HEARTBEAT_TIMEOUT = 5000; // 5 seconds to wait for pong

  const startHeartbeat = () => {
    stopHeartbeat();
    heartbeatInterval = window.setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping", id: crypto.randomUUID() }));

        heartbeatTimeoutId = window.setTimeout(() => {
          console.warn("Heartbeat timeout - closing connection");
          ws.close();
        }, HEARTBEAT_TIMEOUT);
      }
    }, HEARTBEAT_INTERVAL);
  };

  const stopHeartbeat = () => {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    if (heartbeatTimeoutId) {
      clearTimeout(heartbeatTimeoutId);
      heartbeatTimeoutId = null;
    }
  };

  const tryReconnect = () => {
    store.set(connectionStatusAtom, "reconnecting");
    stopHeartbeat();
    if (reconnectAttempts < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectAttempts++;
        connect();
      }, 1000 * reconnectAttempts);
    } else {
      console.error("Max reconnect attempts reached");
      store.set(connectionStatusAtom, "disconnected");
    }
  };

  const connect = () => {
    store.set(connectionStatusAtom, "connecting");
    ws = new WebSocket(connectionString);

    ws.onopen = async () => {
      reconnectAttempts = 0;
      store.set(connectionStatusAtom, "connected");
      startHeartbeat();
      const token = localStorage.getItem("loginToken");
      if (token) {
        try {
          await dispatch("user.loginWithToken", { token: JSON.parse(token) });
        } catch (e) {
          console.error("Re-authentication failed", e);
        }
      }
    };

    ws.onmessage = emitMessage;

    ws.onclose = tryReconnect;

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      ws.close();
    };
  };

  connect();
  document.addEventListener("focus", () => {
    if (ws.readyState != ws.OPEN) {
      tryReconnect();
    }
  });

  addMessageListener((event: MessageEvent) => {
    const data = JSON.parse(event.data);

    // Handle pong response
    if (data.type === "pong") {
      if (heartbeatTimeoutId) {
        clearTimeout(heartbeatTimeoutId);
        heartbeatTimeoutId = null;
      }
      return;
    }

    const eventData = data as Events;
    if (eventData.type === "updateGame") {
      queryClient.setQueryData(
        ["game.getGameState", eventData.game],
        eventData.gameState,
      );
    }
    if (eventData.type === "loss") {
      queryClient.invalidateQueries({
        queryKey: ["scoreboard.getScoreBoard", 10],
      });
    }
    if (eventData.type === "gemsRewarded") {
      queryClient.invalidateQueries({
        queryKey: ["user.getOwnGems", null],
      });
    }
    if (import.meta.env.DEV) {
      console.log("Received message", eventData);
    }
  });

  const dispatch = async <
    TController extends keyof Routes,
    TAction extends keyof Routes[TController] & string,
  >(
    action: `${TController}.${TAction}`,
    // @ts-expect-error We dont care since this is internal api
    payload: z.input<Routes[TController][TAction]["validate"]>,
    // @ts-expect-error We dont care since this is internal api
  ): Promise<Awaited<ReturnType<Routes[TController][TAction]["handler"]>>> => {
    if (ws.readyState !== WebSocket.OPEN) {
      await new Promise<void>((res) => {
        const onOpen = () => {
          ws.removeEventListener("open", onOpen);
          res();
        };
        ws.addEventListener("open", onOpen);
      });
    }
    const requestId = crypto.randomUUID();
    ws.send(
      JSON.stringify({
        type: action,
        payload,
        id: requestId,
      }),
    );
    return new Promise<
      // @ts-expect-error We dont care since this is internal api
      Awaited<ReturnType<Routes[TController][TAction]["handler"]>>
    >((res, rej) => {
      const listener = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.id === requestId) {
          removeMessageListener(listener);
          if (data.error) {
            rej(data.error);
          } else {
            res(data.payload);
          }
        }
      };
      addMessageListener(listener);
    });
  };
  return {
    dispatch,
  };
};

export const wsClient = createWSClient();
