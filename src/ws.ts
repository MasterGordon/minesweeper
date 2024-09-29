import toast from "react-hot-toast";
import useGameStore from "./GameState";

let ws: WebSocket;

export const connectWS = () => {
  ws = new WebSocket("wss://mb.gordon.business/ws");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const name = localStorage.getItem("name");
    if (data.user === name) {
      return;
    }
    if (!useGameStore.getState().showFeed) return;
    switch (data.type) {
      case "new":
        toast(data.user + " started a new game", {
          icon: "🚀",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        break;
      case "loss":
        toast("Game over by " + data.user + " stage " + data.stage, {
          icon: "😢",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        break;
    }
  };
};

export const newGame = (user: string) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "new", user }));
  } else {
    setTimeout(() => {
      newGame(user);
    }, 100);
  }
};

export const loseGame = (user: string, stage: number) => {
  ws.send(JSON.stringify({ type: "loss", user, stage }));
};
