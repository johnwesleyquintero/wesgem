
import React from 'react';

interface ScoreBoardProps {
  score: number;
  lastWin: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, lastWin }) => {
  return (
    <div className="flex-grow">
      <h1 className="text-sm font-bold text-indigo-300 tracking-widest uppercase">SCORE</h1>
      <p className="text-5xl font-mono font-bold text-white tracking-tighter transition-colors duration-300">{score.toLocaleString()}</p>
      {lastWin > 0 && (
         <p key={score} className="absolute text-lg font-bold text-yellow-400 animate-fly-up">+ {lastWin.toLocaleString()}</p>
      )}
    </div>
  );
};

export default ScoreBoard;