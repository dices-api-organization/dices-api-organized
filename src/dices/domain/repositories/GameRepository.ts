import { Player } from '../entities/Player';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<boolean>;
  //getPlayers(): Player;
}
