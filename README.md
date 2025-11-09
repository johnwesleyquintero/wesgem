# 🎰 Project Super Ace — High-Volatility Slot Prototype

**Project Super Ace** is a casino-style web game modeled after modern, high-engagement slots. Built with **Vite + React + TypeScript + Tailwind**, it serves as a robust prototype for exploring the mechanics of digital entertainment and volatility.

This project represents a strategic pivot from a skill-based concept to a pure, high-volatility entertainment engine.
> “To build a sovereign, transparent, and high-engagement gaming system that masters the mathematics of excitement.”

---

## 🚀 Tech Stack

| Layer | Tech | Purpose |
|-------|------|----------|
| Frontend | **Vite + React + TypeScript** | Fast, modern, modular base for dynamic UIs |
| Styling | **Tailwind CSS** | Utility-first styling for rapid iteration of complex visuals |
| Audio | **Web Audio API** | Generates dynamic, file-less sound effects for an immersive experience |
| State | **React State** | Lightweight state management for a complex game loop |
| Deployment | **AI Studio** | Live demo hosting |

---

## ⚙️ Project Structure

```
.
├── components/
│   ├── GemGrid.tsx        # Renders the 5x4 symbol grid
│   ├── SpinButton.tsx     # Initiates the spin/cascade cycle
│   ├── ScoreBoard.tsx     # Displays total score and last win amount
│   └── HUD.tsx            # Shows tokens, multiplier, and free spins
├── logic/
│   └── scoring.ts       # Core win evaluation and payline logic
├── utils/
│   └── audio.ts         # Procedural sound effect generator
├── App.tsx                # Main application component with the core game loop
├── constants.tsx          # Game constants (grid size, pay table, etc.)
├── types.ts               # TypeScript type definitions (Symbol, GameState)
├── index.html             # Entry HTML file
├── index.tsx              # React entry point
└── README.md
```

---

## 🕹️ Gameplay Loop (Volatility Engine)

1. Player clicks **“Spin”**. The spin costs 10 tokens.
2. The 5x4 grid is populated with a new set of random card symbols.
3. The system evaluates all winning combinations (3+ matching symbols on adjacent reels, left-to-right).
4. All symbols in winning combinations are destroyed.
5. The remaining symbols fall down, and new symbols cascade from the top to fill the empty spaces.
6. A **progressive multiplier** increases with each cascade (1x -> 2x -> 3x -> 5x).
7. The loop repeats from Step 3 until no new winning combinations are formed. All wins within a single spin are multiplied by the current multiplier.
8. Landing 3+ **Scatter symbols** triggers a **Free Spins** bonus round with enhanced multipliers.
9. The game ends when the player runs out of tokens.

> 🎯 *“Volatility is the variable. Excitement is the constant.”*

---

## 🧠 Game Logic Overview

| Component/Function | Description |
|-----------|--------------|
| `App.tsx` | Manages the main game state (`IDLE`, `SPINNING`, `EVALUATING`, `CASCADING`, `FREE_SPINS`), tokens, score, multiplier, and free spins. Contains the `handleSpin` and `runCascade` logic that drives the game loop. |
| `logic/scoring.ts` | The core evaluation engine. It takes a 2D grid of symbols and identifies all winning paylines, calculates the base payout using the `PAY_TABLE`, and returns a set of all winning symbols to be destroyed for the cascade. |
| `runCascade` (within `App.tsx`) | A recursive-style function that orchestrates the win -> destroy -> drop -> fill -> re-evaluate cycle. It increments the multiplier with each successful cascade. |
| `GemGrid.tsx` | Renders the 5x4 grid of symbols and handles the visual state changes for spinning and winning symbols. |
| `HUD.tsx` | Displays the critical state variables for the player: current token balance, the active win multiplier, and the number of remaining free spins. |

---

## 🧱 Local Setup (If Forking)

This project is built to run directly in AI Studio, but it can be adapted for local development.

```bash
# 1. This project was scaffolded with Vite. You can create a similar base:
npm create vite@latest wes-slots -- --template react-ts

# 2. Move into the folder
cd wes-slots

# 3. Install dependencies
npm install

# 4. Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Configure Tailwind's content path in `tailwind.config.js`:
# content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

# 6. Copy the component and logic files from this project into your `src` folder.

# 7. Run the development server
npm run dev
```

---

## 🌈 Future Phases

| Phase | Name                | Focus                                   |
| ----- | ------------------- | --------------------------------------- |
| 1     | **Super Ace Core**  | Standalone high-volatility prototype (Current) |
| 2     | **WesSlots Arena**  | Account system, leaderboards, and persistent balances via Supabase |
| 3     | **WesSlots Universe** | Introduction of new slot themes, advanced bonus mechanics, and a unified platform |

---

## 🧭 Operator’s Note

Project Super Ace isn’t a gambling platform.
It’s a **demonstration of a high-engagement entertainment engine** — a sandbox for deconstructing and mastering the systems that make modern games compelling.

> “We’re not chasing luck. We’re building systems that make excitement predictable.”

---

## 🧩 License

MIT License © 2025 John Wesley Quintero & WesAI
Built with integrity, compliance, and curiosity.

---

### 🏗️ Author

**John Wesley Quintero (VAXPH)**
Founder · Architect · Educator
**WesAI Systems — Autonomous Frameworks for the Next Operator Age**
