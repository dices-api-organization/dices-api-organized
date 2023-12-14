import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    const hashPassword = await encrypt(newUser.password);

    const isRegistered = await UserModel.find({
      name: newUser.name
    });
    const comparePasswords = isRegistered.map(
      async (value: { password: string }) => {
        const isSamePass = () => {
          return compare(newUser.password, value.password);
        };
        const isPassRegistered = await isSamePass();
        if (isPassRegistered) {
          console.log('Login please!! There is user with your credentials');
          return null;
        } else {
          return value;
        }
      }
    );
    
    if (comparePasswords.length) {
      console.log('false  ' + comparePasswords);
      return false;
    } else {
      const newUserRegistered: Player = {
        name: newUser.name,
        password: hashPassword
      };
      console.log('true');
      await UserModel.create(newUserRegistered);
      return true;
    }
  }

  async postUserLogin(newUser: Player): Promise<Player | null> {
    const hashPassword = await encrypt(newUser.password);

    const isNameRegistered = await UserModel.find({
      name: newUser.name
    });
    const comparePasswords = isNameRegistered.map(
      async (value: { password: string }) => {
        const isSamePass = async (): Promise<boolean> => {
          return compare(newUser.password, value.password);
        };
        const isPassRegistered = await isSamePass();
        if (isPassRegistered) {
          console.log('Wellcome ');
          return value;
        }
      }
    );
    if (comparePasswords.length == 1) {
      console.log('Yesss ' + comparePasswords);
      return newUser;
    } else {
      console.log('false');
      return null;
    }

    // const isPassRegistered = await UserModel.findOne({
    //   password: newUser.password
    // });
    // if (isPassRegistered && isNameRegistered) {
    //   console.log('success', newUser.name);
    //   return newUser;
    // } else {
    //   console.log('try  again', newUser.name);
    //   return null;
    // }
  }
}
