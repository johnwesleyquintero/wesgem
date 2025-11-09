import { Symbol, SymbolType } from '../types';
import { PAY_TABLE, GRID_ROWS, GRID_COLS } from '../constants';

export interface WinEvaluationResult {
  winningSymbols: Set<string>; // Set of IDs of winning symbols (e.g., 'row-1-col-2')
  totalWin: number;
  scatterCount: number;
}

/**
 * Evaluates the grid for winning combinations.
 * A win is 3 or more matching symbols on the same row, starting from the leftmost reel.
 * Wilds can substitute for any symbol.
 */
export const evaluateGrid = (grid: Symbol[][]): WinEvaluationResult => {
  const winningSymbols = new Set<string>();
  let totalWin = 0;
  let scatterCount = 0;

  // First, count scatters, which can appear anywhere on the grid.
  grid.flat().forEach(symbol => {
    if (symbol.type === SymbolType.SCATTER) {
      scatterCount++;
      winningSymbols.add(symbol.id); // Mark scatters for the winning glow effect
    }
  });

  // Evaluate left-to-right wins for each row independently.
  for (let row = 0; row < GRID_ROWS; row++) {
    const symbolsInLine: Symbol[] = [];
    const firstSymbol = grid[row][0];
    if (!firstSymbol.type) continue; // Skip if the first symbol is empty

    symbolsInLine.push(firstSymbol);
    // Determine the type of the line. If it starts with a Wild, the type is determined by the next non-wild symbol.
    let lineType: SymbolType | null = firstSymbol.type === SymbolType.WILD_ACE ? null : firstSymbol.type;

    // Check subsequent symbols in the same row
    for (let col = 1; col < GRID_COLS; col++) {
      const currentSymbol = grid[row][col];
      if (!currentSymbol.type) break; // Line broken by an empty symbol

      // A symbol matches if it's the same type, a Wild, or if the line is currently composed only of Wilds.
      const isMatch = currentSymbol.type === lineType || currentSymbol.type === SymbolType.WILD_ACE || lineType === null;

      if (isMatch) {
        symbolsInLine.push(currentSymbol);
        // If the line type was not yet determined (all wilds so far), set it now.
        if (lineType === null && currentSymbol.type !== SymbolType.WILD_ACE) {
          lineType = currentSymbol.type;
        }
      } else {
        break; // End of the matching line
      }
    }

    // If a line has 3 or more symbols, calculate the payout.
    if (symbolsInLine.length >= 3) {
      const matchLength = symbolsInLine.length as 3 | 4 | 5;
      // If the line was all wilds, it pays out as a wild line.
      const effectiveType = lineType || SymbolType.WILD_ACE;
      
      const payout = PAY_TABLE[effectiveType]?.[matchLength];
      if (payout) {
        totalWin += payout;
        symbolsInLine.forEach(s => winningSymbols.add(s.id));
      }
    }
  }

  return { winningSymbols, totalWin, scatterCount };
};
