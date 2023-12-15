import { Player } from '../entities/Player';
import { UserSessionToken } from '../entities/UserSessionToken';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<UserSessionToken | null>;
  postUserLogin(newUser: Player): Promise<UserSessionToken | null>;
  //getPlayers(): Player;
}
