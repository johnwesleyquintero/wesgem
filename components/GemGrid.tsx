import React, { useRef, useEffect, useState } from 'react';
import { Gem, GemType, GameState } from '../types';
import { GemVisuals } from '../constants';

// Helper hook to get the previous value of a prop or state
function usePrevious<T>(value: T): T | undefined {
  // Fix: Explicitly initialize useRef with undefined to satisfy the hook's signature and prevent type errors.
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface GemIconProps {
  gem: Gem;
  isSpinning: boolean;
  onLock: (id: string) => void;
  isWinning: boolean;
}

const GemIcon: React.FC<GemIconProps> = ({ gem, isSpinning, onLock, isWinning }) => {
  const [showAppearEffect, setShowAppearEffect] = useState(false);
  const prevIsSpinning = usePrevious(isSpinning);

  useEffect(() => {
    // Trigger effect when spinning stops for a non-locked gem
    if (prevIsSpinning && !isSpinning && !gem.locked) {
      setShowAppearEffect(true);
      const timer = setTimeout(() => setShowAppearEffect(false), 800); // Duration of the appear animation
      return () => clearTimeout(timer);
    }
  }, [isSpinning, prevIsSpinning, gem.locked]);

  const visual = GemVisuals[gem.type];
  const spinClass = isSpinning && !gem.locked ? 'animate-gem-spin' : '';
  const lockedClass = gem.locked ? 'ring-4 ring-amber-400 locked-gem-glow' : 'ring-2 ring-transparent group-hover:ring-white/50';
  
  // The win glow is applied to the container for a better box-shadow effect
  const winClass = isWinning ? 'animate-win-glow' : '';
  // The appear sparkle is applied to the icon itself, but not if it's already getting a win glow
  const appearClass = !isWinning && showAppearEffect ? 'animate-appear-sparkle' : '';

  return (
    <div
      className={`relative group flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-black/20 rounded-xl cursor-pointer transition-all duration-300 ${lockedClass} ${winClass}`}
      onClick={() => onLock(gem.id)}
    >
      <div className={`${spinClass} ${visual.color} ${visual.shadow} ${appearClass}`}>
        {visual.icon}
      </div>
    </div>
  );
};


interface GemGridProps {
  gems: Gem[];
  gameState: GameState;
  onLockGem: (id: string) => void;
  winningGemType: GemType | null;
}

const GemGrid: React.FC<GemGridProps> = ({ gems, gameState, onLockGem, winningGemType }) => {
  const isSpinning = gameState === 'SPINNING';

  return (
    <div className="flex justify-center items-center gap-4">
      {gems.map((gem) => {
        const isWinning = !isSpinning && winningGemType !== null && gem.type === winningGemType;
        return (
          <GemIcon key={gem.id} gem={gem} isSpinning={isSpinning} onLock={onLockGem} isWinning={isWinning} />
        );
      })}
    </div>
  );
};

export default GemGrid;