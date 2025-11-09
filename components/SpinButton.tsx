
import React from 'react';
import { GameState } from '../types';
import { SPIN_COOLDOWN } from '../constants';

interface SpinButtonProps {
  gameState: GameState;
  onSpin: () => void;
}

const SpinButton: React.FC<SpinButtonProps> = ({ gameState, onSpin }) => {
  const isDisabled = gameState === 'SPINNING' || gameState === 'COOLDOWN';

  const getButtonText = () => {
    switch (gameState) {
      case 'SPINNING':
        return 'Spinning...';
      case 'COOLDOWN':
        return 'Cooldown';
      case 'GAME_OVER':
        return 'Game Over';
      default:
        return 'Spin';
    }
  };

  return (
    <button
      onClick={onSpin}
      disabled={isDisabled}
      className="relative w-full h-16 text-2xl font-bold uppercase tracking-widest text-white rounded-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-500/50
                 bg-indigo-600
                 hover:enabled:bg-indigo-500
                 disabled:bg-gray-700 disabled:cursor-not-allowed"
    >
      <span className="relative z-10">{getButtonText()}</span>
       {gameState === 'COOLDOWN' && (
        <div 
          className="absolute inset-0 bg-indigo-800/50 origin-left z-0"
          style={{ animation: `shrink-width ${SPIN_COOLDOWN}ms linear forwards` }}
        />
      )}
      <style>{`
        @keyframes shrink-width {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </button>
  );
};

export default SpinButton;
