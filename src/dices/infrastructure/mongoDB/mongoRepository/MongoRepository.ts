import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    const isRegistered = await UserModel.find({
      name: newUser.name
    });
    if (isRegistered.length) {
      console.log('false');
      return false;
    }
    console.log('true');
    await UserModel.create(newUser);
    return true;
  }

  async getUserLogin(newUser: Player): Promise<Player | null> {
    const userLogged = await UserModel.find({
      name: newUser.name,
      password: newUser.password
    });
    if (userLogged.length) {
      console.log('success');
      return newUser;
    } else {
      console.log('try  again');
      return null;
    }
  }
}
