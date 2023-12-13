import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    const hashPassword = await encrypt(newUser.password)

      const isRegistered = await UserModel.find({
        name:newUser.name,
      })
      if (isRegistered) {
        const comparePasswords = async () => { 
          isRegistered.map(async (value) => {
          const isSamePass = await compare(newUser.password, value.password)
          if (isSamePass)
            return true;
        })
      }
      const comparation = await comparePasswords()
      
        console.log(' ahi va '+ comparation)
      
      console.log('false  ');
      return false;
      }
      console.log('true');
      await UserModel.create(newUser);
      return true;
  }

  async postUserLogin(newUser: Player): Promise<Player | null> {
    
    const isNameRegistered = await UserModel.findOne({
      name: newUser.name 
    });
  
    const isPassRegistered = await UserModel.findOne({
      password: newUser.password
    });
    if (isPassRegistered && isNameRegistered) {
      console.log('success', newUser.name);
      return newUser;
    } else {
      console.log('try  again', newUser.name);
      return null;
    }
  }
}
