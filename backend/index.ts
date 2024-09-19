import type { ServerWebSocket } from "bun";

interface Scoreboard {
  stage: number;
  user: string;
}

const loadScoreboard = async (): Promise<Scoreboard[]> => {
  try {
    const scoreboardFile = Bun.file("./scoreboard.json");
    const scoreboard = await scoreboardFile.json();
    return scoreboard;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return [];
  }
};

const allowCors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const lastMessage = new WeakMap<ServerWebSocket<unknown>, number>();
const server = Bun.serve({
  async fetch(request: Request) {
    if (request.method === "OPTIONS") {
      const res = new Response("Departed", { headers: allowCors });
      return res;
    }
    if (request.url.endsWith("ws")) {
      if (server.upgrade(request)) return new Response("ok");
    }
    if (new URL(request.url).pathname === "/submit") {
      const body = await request.text();
      const data = JSON.parse(body) as { stage: number; user: string };
      const scoreboardFile = Bun.file("./scoreboard.json");
      const scoreboard = await loadScoreboard();
      const currentScore = scoreboard.find((s) => s.user === data.user);
      if (currentScore) {
        if (currentScore.stage < data.stage) {
          currentScore.stage = data.stage;
          Bun.write(scoreboardFile, JSON.stringify(scoreboard));
        }
        return new Response(JSON.stringify(currentScore), {
          headers: {
            "content-type": "application/json",
            ...allowCors,
          },
        });
      }
      scoreboard.push(data);
      Bun.write(scoreboardFile, JSON.stringify(scoreboard));
      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
          ...allowCors,
        },
      });
    }
    const scoreboard = await loadScoreboard();
    const sorted = scoreboard.sort((a, b) => b.stage - a.stage);
    return new Response(JSON.stringify(sorted), {
      headers: {
        "content-type": "application/json",
        ...allowCors,
      },
    });
  },
  websocket: {
    message: (ws, message) => {
      if (typeof message !== "string") {
        return;
      }
      const msg = JSON.parse(message);
      const now = Date.now();
      if (lastMessage.has(ws) && now - lastMessage.get(ws)! < 200) {
        return;
      }
      lastMessage.set(ws, now);
      if (msg.type === "loss") {
        server.publish(
          "minesweeper",
          JSON.stringify({ type: "loss", user: msg.user, stage: msg.stage }),
        );
      } else if (msg.type === "new") {
        server.publish(
          "minesweeper",
          JSON.stringify({ type: "new", user: msg.user }),
        );
      }
    },
    open: async (ws) => {
      ws.subscribe("minesweeper");
    },
  },
  port: 8076,
});
