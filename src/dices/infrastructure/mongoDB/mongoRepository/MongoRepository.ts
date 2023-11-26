import { rejects } from 'assert';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<Player> {
    const isNewUser = new Promise((resolve, rejects) => {
        if(await UserModel.find(newUser))
            rejects(new Error('User exists!!!! Login Please.'))
        resolve('User registered')
    }
      const registerUser = await UserModel.create(newUser);
      return registerUser;
    }
  }
}
