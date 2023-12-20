import { Player } from './Player';

export interface Game extends Player {
  idDiceThrow?: string | number;
  idPlayer: Player;
  diceThrow1: number;
  diceThrow2: number;
  isWinner: boolean;
}
