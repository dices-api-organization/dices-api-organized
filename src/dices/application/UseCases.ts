import { Player } from '../domain/entities/Player';
import { GameRepository } from '../domain/repositories/GameRepository';
import { UserSessionToken } from '../domain/entities/UserSessionToken';
import { Game } from '../domain/entities/Game';

export class UseCases {
  constructor(private readonly gameRepository: GameRepository) {}

  async postUser(newUser: Player): Promise<UserSessionToken | null> {
    const newRegisteredUser = await this.gameRepository.postNewUser(newUser);
    return newRegisteredUser;
  }

  async postUserLogin(newUser: Player): Promise<UserSessionToken | null> {
    const userlogged = await this.gameRepository.postUserLogin(newUser);
    return userlogged;
  }

  async findMaxWinner(): Promise<object | null> {
    const findWinner = await this.gameRepository.findMaxWinner();
    return findWinner;
  }

  async findMinLoser(): Promise<object | null> {
    const findLoser = await this.gameRepository.findMinLoser();
    return findLoser;
  }

  async ratesListing(): Promise<Player[] | null> {
    const ratesListing = await this.gameRepository.ratesListing();
    return ratesListing;
  }

  async allPlayersAndRatings(): Promise<Player[] | null> {
    const playersRatings = await this.gameRepository.allPlayersAndRatings();
    return playersRatings;
  }

  async modifyPlayerName(playerId: string, newName: string): Promise<boolean> {
    const modifyName = await this.gameRepository.modifyPlayerName(
      playerId,
      newName
    );
    return modifyName;
  }

  async playGame(playerId: number): Promise<object | null> {
    const play = await this.gameRepository.playGame(playerId);
    return play;
  }

  async deleteAllGamesFromPlayer(playerId: number): Promise<Player | null> {
    const deleteAllGames =
      await this.gameRepository.deleteAllGamesFromPlayer(playerId);
    return deleteAllGames;
  }

  async listAllGamesFromPlayer(playerId: string): Promise<object[] | null> {
    const listAllGamesFromPlayer =
      await this.gameRepository.listAllGamesFromPlayer(playerId);
    return listAllGamesFromPlayer;
  }
}
