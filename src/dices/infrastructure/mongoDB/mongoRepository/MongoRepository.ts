import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<boolean> {
    const hashPassword = await encrypt(newUser.password);

    const isRegistered = await UserModel.find({ name: newUser.name });

    const comparePasswords = await Promise.all(
      isRegistered.map(async (user: { password: string }) => {
        const isSamePass = await compare(newUser.password, user.password);
        return isSamePass;
      })
    );

    if (comparePasswords.some(match => match)) {
      console.log('Login please!! There is a user with your credentials');
      return false;
    } else {
      const newUserRegistered: Player = {
        name: newUser.name,
        password: hashPassword
      };

      console.log('true');
      const createdUser = await UserModel.create(newUserRegistered);
      console.log('User created with ID:', createdUser._id);
      return true;
    }
  }

  async postUserLogin(newUser: Player): Promise<Player | null> {
    const hashPassword = await encrypt(newUser.password);

    const isNameRegistered = await UserModel.find({ name: newUser.name });

    if (isNameRegistered) {
      const comparePasswords = await Promise.all(
        isNameRegistered.map(async (user: { password: string }) => {
          const isSamePass = compare(newUser.password, user.password);
          return isSamePass;
        })
      );

      if (comparePasswords.some(match => match)) {
        console.log('Welcome');
        return newUser;
      } else {
        console.log('false');
        return null;
      }
    } else {
      console.log('User not found');
      return null;
    }
  }
}
