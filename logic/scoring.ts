import { Symbol, SymbolType } from '../types';
import { PAY_TABLE, GRID_ROWS, GRID_COLS } from '../constants';

export interface WinEvaluationResult {
  winningSymbols: Set<string>; // Set of IDs of winning symbols (e.g., 'row-1-col-2')
  totalWin: number;
  scatterCount: number;
}

/**
 * Evaluates the grid for winning combinations based on paylines.
 * A win is 3 or more matching symbols on adjacent reels, starting from the left.
 */
export const evaluateGrid = (grid: Symbol[][]): WinEvaluationResult => {
  const winningSymbols = new Set<string>();
  let totalWin = 0;
  let scatterCount = 0;

  const symbolGrid = grid.flat();
  
  // Count scatters first, they can be anywhere
  symbolGrid.forEach(symbol => {
    if (symbol.type === SymbolType.SCATTER) {
      scatterCount++;
      winningSymbols.add(symbol.id); // Scatters are also "winning" symbols for animation
    }
  });

  // Evaluate paylines for each symbol type
  for (const symbolType of Object.keys(PAY_TABLE)) {
    if (symbolType === SymbolType.SCATTER) continue; // Scatters handled separately

    // Check for wins starting from the first column
    for (let row = 0; row < GRID_ROWS; row++) {
      const startingSymbol = grid[row][0];
      if (startingSymbol.type === symbolType || startingSymbol.type === SymbolType.WILD_ACE) {
         // Found a potential start of a payline
         const line = findLongestMatch(grid, row, 0, startingSymbol.type);
         if (line.length >= 3) {
            const payout = PAY_TABLE[startingSymbol.type][line.length as 3 | 4 | 5];
            if (payout > 0) {
              totalWin += payout;
              line.forEach(id => winningSymbols.add(id));
            }
         }
      }
    }
  }

  // To avoid double-counting, we must refine the logic to check each potential line only once.
  // This simplified version can over-count if wilds are involved.
  // A more robust implementation would track visited starting symbols.
  // For this prototype, we'll proceed, but acknowledge the simplification.

  // A simplified and more correct approach:
  totalWin = 0; // Reset win
  winningSymbols.clear();
   symbolGrid.forEach(symbol => { // Re-add scatters
    if (symbol.type === SymbolType.SCATTER) winningSymbols.add(symbol.id);
  });


  // Iterate through each row to find starting points for paylines
  for (let row = 0; row < GRID_ROWS; row++) {
    const symbolsInLine: Symbol[] = [grid[row][0]];
    let currentMatch_Type = grid[row][0].type === SymbolType.WILD_ACE ? null : grid[row][0].type;

    for (let col = 1; col < GRID_COLS; col++) {
      const currentSymbol = grid[row][col];
      const symbolMatches = 
          currentSymbol.type === currentMatch_Type || 
          currentSymbol.type === SymbolType.WILD_ACE || 
          currentMatch_Type === null;

      if (symbolMatches) {
        symbolsInLine.push(currentSymbol);
        if(currentMatch_Type === null && currentSymbol.type !== SymbolType.WILD_ACE){
           currentMatch_Type = currentSymbol.type;
        }
      } else {
        break; // Line is broken
      }
    }

    if (symbolsInLine.length >= 3) {
      const matchLength = symbolsInLine.length as 3 | 4 | 5;
      const effectiveType = currentMatch_Type || SymbolType.WILD_ACE; // If all were wild, count as wild line
      const payout = PAY_TABLE[effectiveType][matchLength];
      if(payout) {
        totalWin += payout;
        symbolsInLine.forEach(s => winningSymbols.add(s.id));
      }
    }
  }


  return { winningSymbols, totalWin, scatterCount };
};

function findLongestMatch(grid: Symbol[][], startRow: number, startCol: number, targetType: SymbolType): string[] {
    const line: string[] = [];
    let lastMatchCol = -1;

    // Check first column
    if (grid[startRow][startCol].type === targetType || grid[startRow][startCol].type === SymbolType.WILD_ACE) {
        line.push(grid[startRow][startCol].id);
        lastMatchCol = startCol;
    } else {
        return [];
    }
    
    // Check subsequent columns
    for (let col = startCol + 1; col < GRID_COLS; col++) {
        let foundMatchInCol = false;
        for (let row = 0; row < GRID_ROWS; row++) {
            if (grid[row][col].type === targetType || grid[row][col].type === SymbolType.WILD_ACE) {
                 // Simple adjacent check - real slots have more complex paylines
                line.push(grid[row][col].id);
                foundMatchInCol = true;
                break; // Found one in this column, move to next
            }
        }
        if (!foundMatchInCol) {
            break; // Streak broken
        }
    }
    
    return line;
}
