# 💎 WesGem v0.1 — Skill-Based Casino Prototype

**WesGem** is a legal, skill-driven casino-style web game built using **Vite + React + TypeScript + Tailwind**.  
It’s not gambling — it’s an experiment in **fair play, probability, and pattern recognition** wrapped in a gem-spinning experience.

This project marks the **first phase** of our long-term goal:  
> “To create a sovereign, transparent, and skill-first gaming system that rewards precision, not chance.”

---

## 🚀 Tech Stack

| Layer | Tech | Purpose |
|-------|------|----------|
| Frontend | **Vite + React + TypeScript** | Fast, modern, modular base |
| Styling | **Tailwind CSS** | Utility-first styling for rapid UI iteration |
| State | **React State** | Lightweight state management for a simple prototype |
| Build Tools | **Vite** | Ultra-fast dev/build pipeline |
| Deployment | **AI Studio** | Live demo hosting |

---

## ⚙️ Project Structure

```
.
├── components/
│   ├── GemGrid.tsx        # Main game board logic
│   ├── SpinButton.tsx     # Trigger spins + cooldown
│   ├── ScoreBoard.tsx     # Tracks points + combos
│   └── HUD.tsx            # Heads-up display (tokens, status)
├── App.tsx                # Main application component with core game loop
├── constants.tsx          # Game constants (grid size, costs, etc.)
├── types.ts               # TypeScript type definitions (Gem, GameState)
├── index.html             # Entry HTML file
├── index.tsx              # React entry point
└── README.md
```

---

## 🕹️ Gameplay Loop (Skill-Weighted RNG)

1. Player clicks **“Spin”**. The spin costs 1 token.
2. A 1.5-second cooldown begins. Before spinning, the player can strategically **lock one gem** to hold it for the next spin.
3. The system randomly generates new gems for any unlocked slots using fair, client-side RNG.
4. The score is calculated based on matching gem patterns (2 of a kind or 3 of a kind).
5. Consecutive wins build a **combo streak**, applying a score multiplier.
6. Tokens decrease with each spin. The game ends when the player runs out of tokens.

> 🎯 *“Luck is the variable. Skill is the constant.”*

---

## 🧠 Game Logic Overview

| Component/Function | Description |
|-----------|--------------|
| `App.tsx` | Manages the main game state (`IDLE`, `SPINNING`, `COOLDOWN`, `GAME_OVER`), tokens, score, and combo streak. Contains the core `handleSpin` logic. |
| `evaluateCombo` (within `handleSpin`) | Calculates score from matching gem types. A match of 2 grants 10 points, and a match of 3 grants 50 points, before multipliers. |
| `applyMultiplier` (within `handleSpin`) | Increases the win amount based on the current combo streak (`1 + comboStreak * 0.1`). |
| `GemGrid.tsx` | Renders the grid of gems and handles the UI logic for locking a gem. |
| `SpinButton.tsx` | Controls the spin action and displays the cooldown timer visually. |

---

## 🧱 Local Setup (If Forking)

This project is built to run directly in AI Studio, but it can be adapted for local development.

```bash
# 1. This project was scaffolded with Vite. You can create a similar base:
npm create vite@latest wesgem -- --template react-ts

# 2. Move into the folder
cd wesgem

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
| 1     | **Gem Scatter**     | Standalone skill-based prototype        |
| 2     | **WesGem Arena**    | Account system, leaderboards, and user tokens via Supabase |
| 3     | **WesGem Universe** | A Play-to-Learn model with compliant, skill-based rewards |

---

## 🧭 Operator’s Note

WesGem isn’t a get-rich platform.
It’s a **demonstration of discipline disguised as play** — a sandbox for testing how fairness, mathematics, and design can coexist.

> “We’re not chasing luck. We’re building systems that make luck measurable.”

---

## 🧩 License

MIT License © 2025 John Wesley Quintero & WesAI
Built with integrity, compliance, and curiosity.

---

### 🏗️ Author

**John Wesley Quintero (VAXPH)**
Founder · Architect · Educator
**WesAI Systems — Autonomous Frameworks for the Next Operator Age**
