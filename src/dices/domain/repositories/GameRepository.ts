import { Player } from '../entities/Player';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<boolean>;
  getUserLogin(newUser: Player): Promise<Player | null>;
  //getPlayers(): Player;
}
