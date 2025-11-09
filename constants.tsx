import React from 'react';
import { GemType } from './types';

export const GRID_SIZE = 3;
export const INITIAL_TOKENS = 50;
export const SPIN_COST = 1;
export const SPIN_ANIMATION_DURATION = 1000;
export const SPIN_COOLDOWN = 1500;

export const GEM_TYPES = Object.values(GemType);

// Fix: Replaced JSX.Element with React.ReactElement to resolve TypeScript namespace error.
export const GemVisuals: Record<GemType, { icon: React.ReactElement; color: string; shadow: string }> = {
  [GemType.DIAMOND]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path d="M12.001 2.003c.966 0 1.905.183 2.766.521a24.876 24.876 0 0 1 4.544 2.872.75.75 0 0 1-.22 1.253l-4.545 2.872a.75.75 0 0 1-.69 0l-4.545-2.872a.75.75 0 0 1-.22-1.253 24.878 24.878 0 0 1 4.544-2.872c.86-.338 1.8-.521 2.765-.521ZM12 11.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path fillRule="evenodd" d="M12 21.75c-4.835 0-9.15-2.226-12-5.736a.75.75 0 0 1 .53-1.286C3.123 13.04 7.21 11.25 12 11.25c4.79 0 8.877 1.79 11.47 3.728a.75.75 0 0 1 .53 1.286C21.15 19.524 16.835 21.75 12 21.75Z" clipRule="evenodd" /></svg>,
    color: 'text-cyan-300',
    shadow: 'drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]'
  },
  [GemType.RUBY]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>,
    color: 'text-red-500',
    shadow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
  },
  [GemType.SAPPHIRE]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM12 22.5a.75.75 0 0 1-.75-.75V16.5h1.5v5.25a.75.75 0 0 1-.75.75ZM6 12.75a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1 0-1.5H5.25a.75.75 0 0 1 .75.75ZM21.75 12a.75.75 0 0 1 .75.75v0a.75.75 0 0 1-.75.75H18.75a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>,
    color: 'text-blue-500',
    shadow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]'
  },
  [GemType.EMERALD]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>,
    color: 'text-emerald-400',
    shadow: 'drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]'
  },
  [GemType.AMETHYST]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>,
    color: 'text-purple-500',
    shadow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]'
  },
  [GemType.TOPAZ]: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>,
    color: 'text-yellow-400',
    shadow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]'
  },
};
