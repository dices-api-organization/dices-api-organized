import { Game } from '../entities/Game';
import { Player } from '../entities/Player';
import { UserSessionToken } from '../entities/UserSessionToken';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<UserSessionToken | null>;
  postUserLogin(newUser: Player): Promise<UserSessionToken | null>;
  findMaxWinner(): Promise<string | null>;
  findMinLoser(): Promise<string | null>;
  ratesListing(): Promise<Player[] | null>;
  allPlayersAndRatings(): Promise< Player[] | null>;
  modifyPlayerName(playerId: string, newName: string): Promise<boolean>;
  playGame(playerId: number): Promise<Game | null>;
  deleteAllGamesFromPlayer(playerId: number): Promise<Player | null>;
  listAllGamesFromPlayer(playerId: number): Promise<string | null>;
}
