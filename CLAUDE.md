# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business Minesweeper is a real-time multiplayer minesweeper game with expanding boards, user accounts, match history, spectating, and collectibles. Built with React frontend and Bun backend using WebSockets for real-time communication.

## Development Commands

### Setup
```bash
# Initial setup (requires Bun installed)
echo "SECRET=SOME_RANDOM_STRING" > .env
bun install
bun run drizzle:migrate
```

### Development
```bash
bun dev                    # Start both frontend and backend in development mode
bun run dev:client         # Start only frontend (Vite dev server)
bun run dev:backend        # Start only backend with hot reload
```

### Build & Quality
```bash
bun run build             # Build for production (TypeScript compilation + Vite build)
bun run lint              # Run ESLint
bun run preview           # Preview production build
```

### Database
```bash
bun run drizzle:schema    # Generate database migrations
bun run drizzle:migrate   # Run database migrations
bun run nukedb            # Delete and recreate database (removes sqlite.db)
```

## Architecture

### Frontend (`src/`)
- **Framework**: React 18 + TypeScript with Vite build system
- **Routing**: Wouter for client-side routing
- **State Management**: 
  - Jotai for component state (atoms in `src/atoms.ts`)
  - TanStack Query for server state and caching
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Animation**: Motion (Framer Motion) for UI animations
- **Game Rendering**: Pixi.js with PixiViewport for the minesweeper board

### Backend (`backend/`)
- **Runtime**: Bun with TypeScript
- **Architecture**: WebSocket-based real-time API with controller pattern
- **Database**: SQLite with Drizzle ORM
- **Structure**:
  - `router.ts` - Main request handler and routing
  - `controller/` - Business logic controllers (game, user, scoreboard)
  - `repositories/` - Data access layer
  - `database/` - DB connection and configuration
  - `entities/` - Type definitions
  - `events.ts` - Real-time event system

### Communication
- **WebSocket Client**: `src/wsClient.ts` handles connection, reconnection, and type-safe API calls
- **Real-time Updates**: Server publishes events to all connected clients for live game updates
- **Type Safety**: Shared types between frontend/backend via `Routes` interface

### Key Components

#### Game Logic
- `src/views/endless/Endless.tsx` - Main game view with Pixi.js board
- `src/components/LazyBoard.tsx` - Game board rendering component
- `backend/controller/gameController.ts` - Server-side game logic

#### UI Architecture
- `src/Shell.tsx` - Main layout with responsive drawer navigation
- `src/main.tsx` - App entry point with routing setup
- `src/components/` - Reusable UI components using Radix UI primitives

#### Data Flow
- WebSocket mutations for game actions (reveal, flag, etc.)
- TanStack Query for caching user data, game state, leaderboards
- Jotai atoms for local UI state (current game ID, settings)

## Key Patterns

### WebSocket API Usage
```typescript
const mutation = useWSMutation("game.reveal");
const { data } = useWSQuery("game.getGameState", gameId, !!gameId);
```

### Database Queries
Uses Drizzle ORM with repository pattern for data access. Each controller has corresponding repository in `backend/repositories/`.

### Real-time Events
Server publishes events via `backend/events.ts`, frontend handles via WebSocket message listeners in `wsClient.ts`.