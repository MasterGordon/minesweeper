import { $ } from "bun";

await Promise.all([$`bun run dev:backend`, $`bun run dev:client`]);
