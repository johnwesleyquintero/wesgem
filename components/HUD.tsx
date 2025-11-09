import React from 'react';

interface HUDProps {
  tokens: number;
  comboStreak: number; // Will be repurposed for multiplier
  freeSpins: number;
}

const HUD: React.FC<HUDProps> = ({ tokens, comboStreak, freeSpins }) => {
  return (
    <div className="flex items-center gap-2 text-right">
      {freeSpins > 0 && (
         <div className="flex flex-col items-center justify-center bg-purple-900/40 p-2 rounded-md border border-purple-500/50 w-24">
          <span className="text-xs font-semibold text-purple-300 tracking-wider">FREE SPINS</span>
          <span className="text-2xl font-mono font-bold text-white">{freeSpins}</span>
        </div>
      )}
      <div className="flex flex-col items-center justify-center bg-black/20 p-2 rounded-md border border-white/10 w-24">
        <span className="text-xs font-semibold text-amber-300 tracking-wider">MULTIPLIER</span>
        <span className="text-2xl font-mono font-bold text-white">x{comboStreak}</span>
      </div>
       <div className="flex flex-col items-center justify-center bg-black/20 p-2 rounded-md border border-white/10 w-24">
        <span className="text-xs font-semibold text-cyan-300 tracking-wider">TOKENS</span>
        <span className="text-2xl font-mono font-bold text-white">{tokens}</span>
      </div>
    </div>
  );
};

export default HUD;
