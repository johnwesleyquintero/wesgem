
import React from 'react';

interface HUDProps {
  tokens: number;
  comboStreak: number;
}

const HUD: React.FC<HUDProps> = ({ tokens, comboStreak }) => {
  return (
    <div className="flex items-center gap-4 text-right">
      <div className="flex flex-col items-center justify-center bg-black/20 p-2 rounded-md border border-white/10 w-20">
        <span className="text-xs font-semibold text-amber-300 tracking-wider">COMBO</span>
        <span className="text-2xl font-mono font-bold text-white">x{comboStreak}</span>
      </div>
       <div className="flex flex-col items-center justify-center bg-black/20 p-2 rounded-md border border-white/10 w-20">
        <span className="text-xs font-semibold text-cyan-300 tracking-wider">TOKENS</span>
        <span className="text-2xl font-mono font-bold text-white">{tokens}</span>
      </div>
    </div>
  );
};

export default HUD;
