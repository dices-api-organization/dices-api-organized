import { Player } from '../domain/entities/Player';
import { GameRepository } from '../domain/repositories/GameRepository';
import { UserSessionToken } from '../domain/entities/UserSessionToken';

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
}
