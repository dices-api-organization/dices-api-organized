import { Player } from '../entities/Player';
import { UserSessionToken } from '../entities/UserSessionToken';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<UserSessionToken | null>;
  postUserLogin(newUser: Player): Promise<UserSessionToken | null>;
  findMaxWinner(): Promise<string | null>;
  findMinLoser(): Promise<string | null>;
  ratesListing(): Promise<string | null>;
  allPlayersAndRatings(): Promise<string | null>;
  modifyPlayerName(newUser: Player, newName: string): Promise<boolean>;
  playGame(playerId: number): Promise<boolean>;
  deleteAllGamesFromPlayer(playerId: number): Promise<boolean>;
  listAllGamesFromPlayer(playerId: number): Promise<string | null>;

}
