import { Player } from '../entities/Player';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<boolean>;
  postUserLogin(newUser: Player): Promise<Player | null>;
  //getPlayers(): Player;
}
