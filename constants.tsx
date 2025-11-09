import React from 'react';
import { SymbolType } from './types';

// --- Core Game Configuration ---
export const GRID_ROWS = 4;
export const GRID_COLS = 5;
export const INITIAL_TOKENS = 1000; // Increased for higher volatility
export const SPIN_COST = 10; // Higher cost per spin
export const SPIN_ANIMATION_DURATION = 1000;
export const CASCADE_ANIMATION_DURATION = 500;

// --- Symbol Definitions ---
export const SYMBOL_TYPES = [
  SymbolType.J, SymbolType.Q, SymbolType.K, SymbolType.A,
  SymbolType.SPADE, SymbolType.HEART, SymbolType.CLUB, SymbolType.DIAMOND,
];

// --- Pay Table: Payout per symbol for 3, 4, or 5 matches ---
export const PAY_TABLE: Record<SymbolType, { '3': number; '4': number; '5': number }> = {
  [SymbolType.J]: { '3': 5, '4': 10, '5': 20 },
  [SymbolType.Q]: { '3': 5, '4': 10, '5': 20 },
  [SymbolType.K]: { '3': 8, '4': 15, '5': 30 },
  [SymbolType.A]: { '3': 8, '4': 15, '5': 30 },
  [SymbolType.CLUB]: { '3': 10, '4': 20, '5': 50 },
  [SymbolType.DIAMOND]: { '3': 10, '4': 20, '5': 50 },
  [SymbolType.HEART]: { '3': 15, '4': 30, '5': 80 },
  [SymbolType.SPADE]: { '3': 15, '4': 30, '5': 80 },
  [SymbolType.WILD_ACE]: { '3': 20, '4': 50, '5': 100 }, // Wilds can also form their own paylines
  [SymbolType.SCATTER]: { '3': 0, '4': 0, '5': 0 }, // Scatters trigger bonuses, no direct payout
};


// --- Visuals for Symbols ---
export const SymbolVisuals: Record<SymbolType, { icon: React.ReactElement; color: string; shadow: string }> = {
  [SymbolType.J]: { icon: <div className="text-4xl font-black">J</div>, color: 'text-blue-300', shadow: 'drop-shadow-[0_0_4px_rgba(147,197,253,0.7)]' },
  [SymbolType.Q]: { icon: <div className="text-4xl font-black">Q</div>, color: 'text-green-300', shadow: 'drop-shadow-[0_0_4px_rgba(134,239,172,0.7)]' },
  [SymbolType.K]: { icon: <div className="text-4xl font-black">K</div>, color: 'text-red-400', shadow: 'drop-shadow-[0_0_4px_rgba(248,113,113,0.7)]' },
  [SymbolType.A]: { icon: <div className="text-4xl font-black">A</div>, color: 'text-purple-400', shadow: 'drop-shadow-[0_0_4px_rgba(192,132,252,0.7)]' },
  [SymbolType.CLUB]: { icon: <div className="text-4xl">♣</div>, color: 'text-green-400', shadow: 'drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]' },
  [SymbolType.DIAMOND]: { icon: <div className="text-4xl">♦</div>, color: 'text-cyan-400', shadow: 'drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]' },
  [SymbolType.HEART]: { icon: <div className="text-4xl">♥</div>, color: 'text-red-500', shadow: 'drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]' },
  [SymbolType.SPADE]: { icon: <div className="text-4xl">♠</div>, color: 'text-yellow-400', shadow: 'drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]' },
  [SymbolType.WILD_ACE]: { icon: <div className="text-4xl font-black text-yellow-300">A</div>, color: 'text-yellow-300', shadow: 'drop-shadow-[0_0_10px_rgba(252,211,77,1)]' },
  [SymbolType.SCATTER]: { icon: <div className="text-3xl font-bold">B</div>, color: 'text-indigo-400', shadow: 'drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]' },
};
