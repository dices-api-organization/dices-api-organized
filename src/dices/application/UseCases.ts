import { Player } from '../domain/entities/Player';
import { GameRepository } from '../domain/repositories/GameRepository';

export class UseCases {
  constructor(private readonly gameRepository: GameRepository) {}

  async postUser(newUser: Player): Promise<boolean> {
    const newRegisteredUser = await this.gameRepository.postNewUser(newUser);
    return newRegisteredUser;
  }

  async postUserLogin(newUser: Player): Promise<Player | null> {
    const userlogged = await this.gameRepository.postUserLogin(newUser);
    return userlogged;
  }
}
