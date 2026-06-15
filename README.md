# 💣 Business Minesweeper

This is a version of minesweeper with a expanding board after each stage. This also includes a account system with match history, spectating live matches and collectables.

## 🚀 Local Development

For local development you are required to have [bun](https://bun.sh/) installed.

```bash
# Create a .env file for token signing
echo "SECRET=SOME_RANDOM_STRING" > .env
bun install
bun run drizzle:migrate
bun dev
```

## 🚀 Deployment

Deployment requires `VITE_BACKEND_URL` to be set

## 📦 Used Libraries

- [Pixi.js](https://github.com/pixijs/pixi-react)
- [PixiViewport](https://github.com/davidfig/pixi-viewport)
- [Tanstack Query](https://github.com/TanStack/query)
- [Zod](https://github.com/colinhacks/zod)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [Tailwind CSS v4](https://github.com/tailwindlabs/tailwindcss)
- [React](https://github.com/facebook/react)

## AI Disclaimer

For the project itself no AI was used for coding (not vibecoded). I've just used this project to test out new AI Tools to see how it would to tasks.

The low poly images are AI generated since I couldn't find any stock images related to minesweeper :). When you wanna create some new images (any style) feel free to put up a PR.

## 📋 Maybe TODO/Ideas

- Add global big board
- Powerups
