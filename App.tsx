import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Symbol, SymbolType, GameState } from './types';
import {
  GRID_ROWS,
  GRID_COLS,
  INITIAL_TOKENS,
  SPIN_COST,
  SPIN_ANIMATION_DURATION,
  CASCADE_ANIMATION_DURATION,
  SYMBOL_TYPES
} from './constants';
import HUD from './components/HUD';
import ScoreBoard from './components/ScoreBoard';
import GemGrid from './components/GemGrid'; // Renaming this would be ideal, but we'll reuse for now
import SpinButton from './components/SpinButton';
import { evaluateGrid } from './logic/scoring';
import { playSound } from './utils/audio';

const generateRandomSymbol = (row: number, col: number): Symbol => ({
  id: `symbol-${row}-${col}`,
  type: SYMBOL_TYPES[Math.floor(Math.random() * SYMBOL_TYPES.length)],
  row,
  col,
});

const generateGrid = (): Symbol[][] => {
  return Array.from({ length: GRID_ROWS }, (_, r) =>
    Array.from({ length: GRID_COLS }, (_, c) => generateRandomSymbol(r, c))
  );
};

const App: React.FC = () => {
  const [grid, setGrid] = useState<Symbol[][]>([]);
  const [tokens, setTokens] = useState<number>(INITIAL_TOKENS);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [lastWin, setLastWin] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [freeSpins, setFreeSpins] = useState<number>(0);
  const [winningSymbolIds, setWinningSymbolIds] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  const handleRestart = useCallback(() => {
    playSound('restart');
    setTokens(INITIAL_TOKENS);
    setScore(0);
    setLastWin(0);
    setMultiplier(1);
    setFreeSpins(0);
    setGrid(generateGrid());
    setWinningSymbolIds(new Set());
    setGameState('IDLE');
  }, []);

  const runCascade = useCallback((currentGrid: Symbol[][], currentMultiplier: number) => {
    setGameState('EVALUATING');
    const { winningSymbols, totalWin, scatterCount } = evaluateGrid(currentGrid);
    
    setWinningSymbolIds(winningSymbols);

    if (totalWin > 0 || scatterCount > 0) {
      const winAmount = totalWin * currentMultiplier;
      setScore(prev => prev + winAmount);
      setLastWin(winAmount);
      playSound('win');
      
      if (scatterCount >= 3) {
        setFreeSpins(prev => prev + 10);
      }
      
      setTimeout(() => {
        setGameState('CASCADING');
        // Create new grid by removing winning symbols and letting others fall
        let newGrid = currentGrid.map(row => row.map(symbol => 
            winningSymbols.has(symbol.id) ? { ...symbol, type: null } : symbol
        ));

        // Let symbols fall
        for (let col = 0; col < GRID_COLS; col++) {
            let emptyRow = GRID_ROWS - 1;
            for (let row = GRID_ROWS - 1; row >= 0; row--) {
                if (newGrid[row][col].type !== null) {
                    [newGrid[emptyRow][col], newGrid[row][col]] = [newGrid[row][col], newGrid[emptyRow][col]];
                    emptyRow--;
                }
            }
        }

        // Fill empty spots with new symbols
        newGrid = newGrid.map((row, r) => row.map((symbol, c) => 
            symbol.type === null ? generateRandomSymbol(r, c) : symbol
        ));
        
        setGrid(newGrid);
        setMultiplier(prev => prev + 1);
        runCascade(newGrid, currentMultiplier + 1);

      }, CASCADE_ANIMATION_DURATION);
    } else {
        // No more wins, end the spin cycle
        if(freeSpins > 0) {
          setFreeSpins(prev => prev-1);
        }
        setWinningSymbolIds(new Set());
        setGameState('IDLE');
    }

  }, [freeSpins]);
  
  const handleSpin = useCallback(() => {
    if (gameState !== 'IDLE' || (tokens < SPIN_COST && freeSpins === 0)) {
       if (tokens < SPIN_COST) setGameState('GAME_OVER');
       return;
    }

    playSound('spin');
    setGameState('SPINNING');
    if (freeSpins === 0) {
        setTokens(prev => prev - SPIN_COST);
    }
    setLastWin(0);
    setMultiplier(1);
    setWinningSymbolIds(new Set());

    const newGrid = generateGrid();
    setGrid(newGrid);

    setTimeout(() => {
      runCascade(newGrid, freeSpins > 0 ? 2 : 1); // Start with higher base multiplier in free spins
    }, SPIN_ANIMATION_DURATION);

  }, [gameState, tokens, freeSpins, runCascade]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
        <main className="w-full max-w-lg mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/20 border border-white/10 p-4 md:p-6 flex flex-col gap-4">
          <header className="flex justify-between items-center gap-4">
            <ScoreBoard score={score} lastWin={lastWin} />
            <HUD tokens={tokens} comboStreak={multiplier} freeSpins={freeSpins} />
          </header>

          <GemGrid gems={grid.flat()} gameState={gameState} winningSymbolIds={winningSymbolIds} />
          
          <SpinButton gameState={gameState} onSpin={handleSpin} />
        </main>
        <footer className="text-center mt-6 text-xs text-gray-500">
          <p>Project Super Ace — Volatility is the variable.</p>
          <p>&copy; 2025 WesAI Systems</p>
        </footer>

      {gameState === 'GAME_OVER' && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-indigo-500/50 rounded-xl p-8 text-center shadow-lg shadow-indigo-500/20 flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-indigo-400">GAME OVER</h2>
            <p className="text-lg text-gray-300">Your final score is:</p>
            <p className="text-5xl font-mono font-bold text-white">{score}</p>
            <button
              onClick={handleRestart}
              className="mt-4 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;