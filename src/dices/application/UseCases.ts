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

  async findMaxWinner(): Promise<string | null>{
    const findWinner = await this.gameRepository.findMaxWinner();
    return findWinner;

  }

  async findMinLoser(): Promise<string | null>{
    const findLoser = await this.gameRepository.findMinLoser();
    return findLoser;

  }

  async ratesListing(): Promise<string | null>{
    const ratesListing = await this.gameRepository.ratesListing();
    return ratesListing;

  }

  async allPlayersAndRatings(): Promise<string | null>{
    const playersRatings = await this.gameRepository.allPlayersAndRatings();
    return playersRatings;

  }

  async modifyPlayerName(newUser: Player, newName: string): Promise<boolean>{
    const modifyName = await this.gameRepository.modifyPlayerName(newUser, newName);
    return modifyName;

  }

  async playGame(playerId: number): Promise<Game | null>{
    const play = await this.gameRepository.playGame(playerId);
    return play;

  }

  async deleteAllGamesFromPlayer(playerId: number): Promise<boolean>{
    const deleteAllGames = await this.gameRepository.deleteAllGamesFromPlayer(playerId);
    return deleteAllGames;

  }

  async listAllGamesFromPlayer(playerId: number): Promise<string | null>{
    const listAllGamesFromPlayer = await this.gameRepository.listAllGamesFromPlayer(playerId);
    return listAllGamesFromPlayer;

  }



}
