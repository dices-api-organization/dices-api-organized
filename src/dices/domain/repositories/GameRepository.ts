import { Player } from '../entities/Player';

export interface GameRepository {
  postNewUser(newUser: Player): Promise<boolean>;
  postUserLogin(newUser: Player): Promise<Player | null>;
  findMaxWinner(): Promise<string | null>;
  findMinLoser(): Promise<string | null>;
  ratesListing(): Promise<string | null>;
  allPlayersAndRatings(): Promise<string | null>;
  modifyPlayerName(newUser: Player, newName: string): Promise<boolean>;
  playGame(playerId: number): Promise<boolean>;
  deleteAllGamesFromPlayer(playerId: number): Promise<boolean>;
  listAllGamesFromPlayer(playerId: number): Promise<string | null>;

}
