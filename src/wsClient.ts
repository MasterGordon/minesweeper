import type { Routes } from "../backend/router";
import type { Events } from "../shared/events";
import { queryClient } from "./queryClient";

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
  let ws = new WebSocket(connectionString);
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  const connect = () => {
    ws = new WebSocket(connectionString);

    ws.onopen = async () => {
      reconnectAttempts = 0;
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

    ws.onclose = () => {
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          reconnectAttempts++;
          connect();
        }, 1000 * reconnectAttempts);
      } else {
        console.error("Max reconnect attempts reached");
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      ws.close();
    };
  };

  connect();

  addMessageListener((event: MessageEvent) => {
    const data = JSON.parse(event.data) as Events;
    if (data.type === "updateGame") {
      queryClient.refetchQueries({
        queryKey: ["game.getGameState", data.game],
      });
    }
    if (data.type === "loss") {
      queryClient.invalidateQueries({
        queryKey: ["scoreboard.getScoreBoard", 10],
      });
    }
    if (data.type === "gemsRewarded") {
      queryClient.invalidateQueries({
        queryKey: ["user.getOwnGems", null],
      });
    }
    if (import.meta.env.DEV) {
      console.log("Received message", data);
    }
  });

  const dispatch = async <
    TController extends keyof Routes,
    TAction extends keyof Routes[TController] & string,
  >(
    action: `${TController}.${TAction}`,
    // @ts-expect-error We dont care since this is internal api
    payload: Routes[TController][TAction]["validate"]["_input"],
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
