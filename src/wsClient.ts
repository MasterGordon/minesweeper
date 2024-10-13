import type { Routes } from "../backend/router";
import { Events } from "../shared/events";
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
  const ws = new WebSocket(connectionString);
  ws.onmessage = emitMessage;
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
        ws.onopen = () => {
          res();
        };
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
