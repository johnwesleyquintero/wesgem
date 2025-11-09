import React from 'react';
import { Symbol as GameSymbol, SymbolType, GameState } from '../types';
import { SymbolVisuals, GRID_COLS } from '../constants';

interface GemIconProps {
  symbol: GameSymbol;
  isSpinning: boolean;
  isWinning: boolean;
}

const SymbolIcon: React.FC<GemIconProps> = ({ symbol, isSpinning, isWinning }) => {
  if (!symbol.type) return null; // Don't render empty slots during cascade
  const visual = SymbolVisuals[symbol.type];
  
  const spinClass = isSpinning ? 'animate-gem-spin' : '';
  const winClass = isWinning ? 'animate-win-glow' : '';

  return (
    <div
      className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-black/20 rounded-lg transition-all duration-300 ${winClass}`}
    >
      <div className={`${spinClass} ${visual.color} ${visual.shadow}`}>
        {visual.icon}
      </div>
    </div>
  );
};

interface GemGridProps {
  gems: GameSymbol[]; // Now expecting a flat array of all symbols
  gameState: GameState;
  winningSymbolIds: Set<string>;
}

const GemGrid: React.FC<GemGridProps> = ({ gems, gameState, winningSymbolIds }) => {
  const isSpinning = gameState === 'SPINNING';

  return (
    <div 
      className="grid gap-2 p-2 bg-black/20 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
      }}
    >
      {gems.map((symbol) => {
        const isWinning = winningSymbolIds.has(symbol.id);
        return (
          <SymbolIcon key={symbol.id} symbol={symbol} isSpinning={isSpinning} isWinning={isWinning} />
        );
      })}
    </div>
  );
};

export default GemGrid;