import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    const isRegistered = await UserModel.find({
      name: newUser.name
    });
    if (isRegistered.length) {
      return false;
    }
    console.log('true');
    await UserModel.create(newUser);
    return true;
  }
}
