import { Player } from './Player';

export interface Game extends Player {
  idDiceThrow: string | number;
  idPlayer: Player;
  diceThrow: number;
  isWinner: boolean;
}
