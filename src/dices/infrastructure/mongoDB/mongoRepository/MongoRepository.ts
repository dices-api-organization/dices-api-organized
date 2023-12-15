import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserSessionToken } from '../../../domain/entities/UserSessionToken';

dotenv.config()

const secret = process.env.SECRET_KEY ?? 'sin secretos';

export class MongoGameRepository implements GameRepository {

  async postNewUser(newUser: Player): Promise<UserSessionToken | null> {
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
      return null;
    } else {
      const newUserRegistered: Player = {
        name: newUser.name,
        password: hashPassword
      };

      const createdUser = await UserModel.create(newUserRegistered);
      console.log('User created with ID:', createdUser._id);
      const token = jwt.sign({ id: createdUser._id.toString(), name: createdUser.name }, secret, {
        expiresIn: '2 days',
      })
      console.log(token)
      return { id: createdUser.id, name: createdUser.name, token: token };
    }
  }

  async postUserLogin(newUser: Player): Promise<UserSessionToken | null> {
    const hashPassword = await encrypt(newUser.password);

    const isNameRegistered = await UserModel.find({ name: newUser.name });

    if (isNameRegistered) {
      const isUserRegistered = isNameRegistered.find(objeto => compare(newUser.password, objeto.password))

      if (isUserRegistered) {
        const token = jwt.sign({ id: isUserRegistered.id, name: isUserRegistered.name }, secret, {
          expiresIn: '2 days',
        })
        return { id: isUserRegistered.id, name: isUserRegistered.name, token: token }
      } else {
        console.log('User not found');
        return null;
      }
    } else {
      console.log('User not found');
      return null;
    }
  }
}

