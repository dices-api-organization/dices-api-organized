import { Game } from '../entities/Game';
import { Player } from '../entities/Player';
import { UserSessionToken } from '../entities/UserSessionToken';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<UserSessionToken | null>;
  postUserLogin(newUser: Player): Promise<UserSessionToken | null>;
  findMaxWinner(): Promise<object | null>;
  findMinLoser(): Promise<object | null>;
  ratesListing(): Promise<object[] | null>;
  allPlayersAndRatings(): Promise<object[] | null>;
  modifyPlayerName(playerId: string, newName: string): Promise<boolean>;
  playGame(playerId: number): Promise<object | null>;
  deleteAllGamesFromPlayer(playerId: number): Promise<boolean>;
  listAllGamesFromPlayer(playerId: string): Promise<object[] | null>;
}
