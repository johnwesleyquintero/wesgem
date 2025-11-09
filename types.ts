
export enum GemType {
  DIAMOND = 'DIAMOND',
  RUBY = 'RUBY',
  SAPPHIRE = 'SAPPHIRE',
  EMERALD = 'EMERALD',
  AMETHYST = 'AMETHYST',
  TOPAZ = 'TOPAZ',
}

export interface Gem {
  id: string;
  type: GemType;
  locked: boolean;
}

export type GameState = 'IDLE' | 'SPINNING' | 'COOLDOWN' | 'GAME_OVER';
