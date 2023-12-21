import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { UserModel } from '../mongoModel/UserSchema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserSessionToken } from '../../../domain/entities/UserSessionToken';

dotenv.config();

const secret = process.env.SECRET_KEY ?? 'sin secretos';

import { userSchemaInterface } from '../mongoModel/UserSchema';

import { Aggregate } from 'mongoose';
import { Game } from '../../../domain/entities/Game';

export class MongoGameRepository implements GameRepository {
  async postNewUser(newUser: Player): Promise<UserSessionToken | null> {
    const hashPassword = await encrypt(newUser.password);

    const isRegistered = await UserModel.find({ name: newUser.name });

    if (newUser.name !== 'Anonim'){

      let doesUserExist = isRegistered.find((element) => element.name == newUser.name);

      if (doesUserExist){
        return null;
      }
    }

    const allUsers = await UserModel.find({ });

    const comparePasswords: boolean[] = await Promise.all(
      allUsers.map(async (user: { password: string }) => {
        const isSamePass = compare(newUser.password, user.password);
        return isSamePass;
      })
    );

    if (comparePasswords.some((match) => match)) {
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

    const isNameRegistered = await UserModel.find({ name: newUser.name });

    if (isNameRegistered) {
      const isUserRegistered = isNameRegistered.find((objeto) =>
        compare(newUser.password, objeto.password)
      );

      if (isUserRegistered) {
        const token = jwt.sign(
          { id: isUserRegistered.id, name: isUserRegistered.name },
          secret,
          {
            expiresIn: '2 days'
          }
        );
        console.log(token);
        return {
          id: isUserRegistered.id,
          name: isUserRegistered.name,
          token: token
        };
      } else {
        console.log('User not found');
        return null;
      }
    } else {
      console.log('User not found');
      return null;
    }
  }

  async findMaxWinner(): Promise<string | null> {
    const maxWinner: userSchemaInterface | null = await UserModel.findOne()
      .sort({ success_rate: -1 })
      .limit(1);

    if (!maxWinner) {
      return null;
    }

    return `Player ${maxWinner.name} is the highest winner, with a score of ${maxWinner.success_rate}`;
  }

  async findMinLoser(): Promise<string | null> {
    const minLoser: userSchemaInterface | null = await UserModel.findOne()
      .sort({ success_rate: -1 })
      .limit(1);

    if (!minLoser) {
      return null;
    }

    return `Player ${minLoser.name} is the lowest loser, with a score of ${minLoser.success_rate}`;
  }

  async ratesListing(): Promise<string | null>{
    const ratesList: Array<userSchemaInterface> | null = await UserModel.find().sort({success_rate:-1})

    if (!ratesList) {
      return null;
    }

    let listingText = '';
    ratesList.forEach((element)=>{
      listingText += `${element.toJSON().name} has a success rate of ${element.toJSON().success_rate}\n`;
    })

    // Now find total average of all players

    const allPlayers: Array<userSchemaInterface> | null =
      await UserModel.find();

    let allSuccessRates: Array<number> = [];

    allPlayers.forEach((element)=>{
      if (typeof element.success_rate === 'number'){
        
        allSuccessRates.push(element.success_rate);
      }
    });

    let totalSum: number = 0;

    for (let i=0;i<allSuccessRates.length;i++){

      if (typeof allSuccessRates[i] === 'number'){

        totalSum += allSuccessRates[i];
      }
    }

    const totalAverage = totalSum / allSuccessRates.length;

    listingText += `\nAnd finally, the total average for all players is: ${totalAverage?.toFixed(2)}`;

    return listingText;
  }

  async allPlayersAndRatings(): Promise<string | null> {
    const allPlayers: Array<userSchemaInterface> | null =
      await UserModel.find();

    if (!allPlayers) {
      return null;
    }

    let playersList = '';
    allPlayers.forEach((element)=>{
      playersList += `${element.toJSON().name} has a success rate of ${element.toJSON().success_rate}\n`;
    })
    return playersList;

  }

  async modifyPlayerName(playerId: string, newName: string): Promise<boolean> {
    const modifiedPlayer: userSchemaInterface | null =
      await UserModel.findOneAndUpdate(
        { _id: playerId },
        { $set: { name: newName } }
      );
    if (!modifiedPlayer) {
      return false;
    }

    return true;
  }

  async playGame(playerId: number): Promise<Game | null> {
    //Obtain our current player for future use

    const currentPlayer: userSchemaInterface | null = await UserModel.findOne({
      _id: playerId
    });

    if (!currentPlayer) {
      // Game could not be played, false!
      return null;
    }

    // How many games have they played

    const numOfGames = currentPlayer.num_of_games;

    // Find how many wins they have

    let numOfWins = currentPlayer.num_of_wins;

    // Establish updated numbers of games and wins, for possible future use
    const updateNumOfGames = numOfGames + 1;

    // Update player's played games number

    const modifyNumOfGames: userSchemaInterface | null =
      await UserModel.findOneAndUpdate(
        { _id: playerId },
        { $set: { num_of_games: updateNumOfGames } }
      );

    // Finally, play our game
    const dice1Random = Math.floor(Math.random() * 6) + 1;
    const dice2Random = Math.floor(Math.random() * 6) + 1;

    let resultOfGame = false;

    if (dice1Random + dice2Random === 7) {
      resultOfGame = true;
      numOfWins = numOfWins + 1;

      const modifyNumOfWins: userSchemaInterface | null =
        await UserModel.findOneAndUpdate(
          { _id: playerId },
          { $set: { num_of_wins: numOfWins } }
        );
    }

    // Finding AVG success
    const playerSuccessRate = (numOfWins / updateNumOfGames) * 100;

    const addNewGame = await UserModel.findOneAndUpdate(
      { _id: playerId },
      {
        $push: {
          games: {
            dice_1: dice1Random,
            dice_2: dice2Random,
            winOrLose: resultOfGame
          }
        }
      }

    );
    const modifyRateOfSuccess: userSchemaInterface | null =
      await UserModel.findOneAndUpdate(
        { _id: playerId },
        { $set: { success_rate: playerSuccessRate } }
      );
    // Game could be played, so true!
    return { diceThrow1: dice1Random, diceThrow2: dice2Random };

  }

  async deleteAllGamesFromPlayer(playerId: number): Promise<boolean> {
    console.log(playerId)
    const deleteAllGames = await UserModel.deleteOne(
      { _id: playerId })
      console.log(playerId)

    if (!deleteAllGames){
      return false
    }

    return true;
  }

  async listAllGamesFromPlayer(playerId: number): Promise<string | null> {
    const currentPlayer: userSchemaInterface | null = await UserModel.findOne({
      _id: playerId
    });

    if (!currentPlayer) {
      return null;
    }

    const playersGames = currentPlayer.games;
    let playersGamesList = '';

    if (typeof playersGames === 'undefined') {
      playersGamesList = 'This player has no games!';
      return playersGamesList;
    }

    playersGames.forEach((element) => {
      playersGamesList += `${element}\n`;
    });
    return playersGamesList;
  }
}
