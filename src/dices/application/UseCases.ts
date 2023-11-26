import { Player } from '../domain/entities/Player';
import { GameRepository } from '../domain/repositories/GameRepository';

export class UseCases {
  constructor(private readonly gameRepository: GameRepository) {}

  async postUser(newUser: Player): Promise<Player> {
    const newRegisteredUser = await this.gameRepository.postNewUser(newUser);
    return newRegisteredUser;
  }
}
