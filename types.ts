export enum SymbolType {
  J = 'J',
  Q = 'Q',
  K = 'K',
  A = 'A',
  SPADE = 'SPADE',
  HEART = 'HEART',
  CLUB = 'CLUB',
  DIAMOND = 'DIAMOND',
  WILD_ACE = 'WILD_ACE',
  SCATTER = 'SCATTER',
}

export interface Symbol {
  id: string; // Unique identifier (e.g., `row-0-col-0`)
  type: SymbolType | null; // A symbol can be cleared during a cascade
  row: number;
  col: number;
}

// GameState expanded to handle cascading wins and bonus rounds
export type GameState = 'IDLE' | 'SPINNING' | 'EVALUATING' | 'CASCADING' | 'FREE_SPINS' | 'GAME_OVER';