export interface Game {
  idDiceThrow?: string | number;
  idPlayer?: string;
  diceThrow1: number;
  diceThrow2: number;
  isWinner?: boolean;
}