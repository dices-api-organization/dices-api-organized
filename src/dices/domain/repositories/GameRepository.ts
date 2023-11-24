import { Player } from '../entities/Player';

export interface GameRepository {
  getPlayers(): Player;
}
