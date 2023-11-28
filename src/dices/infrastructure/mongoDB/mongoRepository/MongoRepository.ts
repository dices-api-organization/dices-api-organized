import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    if (await UserModel.find(newUser)) {
      console.log('false');
      throw new Error('User exists!!!! Login Please.');
      return false;
    }
    console.log('true');
    await UserModel.create(newUser);
    return true;
  }
}
//}
