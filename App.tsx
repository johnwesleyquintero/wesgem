import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Gem, GemType, GameState } from './types';
import {
  GRID_SIZE,
  INITIAL_TOKENS,
  SPIN_COST,
  SPIN_ANIMATION_DURATION,
  SPIN_COOLDOWN,
  GEM_TYPES
} from './constants';
import HUD from './components/HUD';
import ScoreBoard from './components/ScoreBoard';
import GemGrid from './components/GemGrid';
import SpinButton from './components/SpinButton';

const generateRandomGem = (id: string, locked: boolean = false): Gem => ({
  id,
  type: GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)],
  locked,
});

const App: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [tokens, setTokens] = useState<number>(INITIAL_TOKENS);
  const [score, setScore] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [lastWin, setLastWin] = useState<number>(0);
  const [winningGemType, setWinningGemType] = useState<GemType | null>(null);

  const initialGems = useMemo(() => 
    Array.from({ length: GRID_SIZE }, (_, i) => generateRandomGem(`gem-${i}`))
  , []);

  useEffect(() => {
    setGems(initialGems);
  }, [initialGems]);

  const handleRestart = useCallback(() => {
    setTokens(INITIAL_TOKENS);
    setScore(0);
    setComboStreak(0);
    setLastWin(0);
    setGems(initialGems);
    setGameState('IDLE');
    setWinningGemType(null);
  }, [initialGems]);
  
  const handleSpin = useCallback(() => {
    if (gameState === 'SPINNING' || gameState === 'COOLDOWN' || tokens < SPIN_COST) {
      if (tokens < SPIN_COST) setGameState('GAME_OVER');
      return;
    }

    setGameState('SPINNING');
    setTokens(prev => prev - SPIN_COST);
    setLastWin(0);
    setWinningGemType(null); // Reset winning gems on new spin

    const newGems = gems.map(gem => 
      gem.locked ? gem : generateRandomGem(gem.id)
    );
    setGems(newGems);

    setTimeout(() => {
      // --- Scoring Logic ---
      const counts: Record<string, number> = {};
      newGems.forEach(gem => {
        counts[gem.type] = (counts[gem.type] || 0) + 1;
      });
      
      const maxCount = Math.max(...Object.values(counts), 0);
      let baseScore = 0;
      if (maxCount === 2) baseScore = 10;
      if (maxCount === 3) baseScore = 50;
      
      let currentWin = 0;
      let currentWinningType: GemType | null = null;
      if (baseScore > 0) {
        // Find the winning gem type to apply effects
        for (const type in counts) {
          if (counts[type] === maxCount) {
            currentWinningType = type as GemType;
            break;
          }
        }
        const multiplier = 1 + comboStreak * 0.1;
        currentWin = Math.round(baseScore * multiplier);
        setScore(prev => prev + currentWin);
        setComboStreak(prev => prev + 1);
      } else {
        setComboStreak(0);
      }
      setLastWin(currentWin);
      setWinningGemType(currentWinningType);
      
      if (tokens - SPIN_COST <= 0 && currentWin === 0) {
        setGameState('GAME_OVER');
      } else {
        setGameState('COOLDOWN');
        setTimeout(() => setGameState('IDLE'), SPIN_COOLDOWN);
      }

    }, SPIN_ANIMATION_DURATION);

  }, [gameState, tokens, gems, comboStreak]);

  const handleLockGem = useCallback((idToToggle: string) => {
    if (gameState === 'SPINNING') return;
    setGems(prevGems => {
      const isAlreadyLocked = prevGems.find(g => g.id === idToToggle)?.locked;
      return prevGems.map(gem => ({
        ...gem,
        locked: gem.id === idToToggle ? !gem.locked : false,
      }));
    });
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
        <main className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/20 border border-white/10 p-6 md:p-8 flex flex-col gap-6">
          <header className="flex justify-between items-center gap-4">
            <ScoreBoard score={score} lastWin={lastWin} />
            <HUD tokens={tokens} comboStreak={comboStreak} />
          </header>

          <GemGrid gems={gems} gameState={gameState} onLockGem={handleLockGem} winningGemType={winningGemType} />
          
          <SpinButton gameState={gameState} onSpin={handleSpin} />
        </main>
        <footer className="text-center mt-8 text-xs text-gray-500">
          <p>WesGem v0.1 — Skill is the constant.</p>
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