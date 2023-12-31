import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { mySqlGame } from '../sqlModel/MySqlGameModel';
import { mySqlPlayer } from '../sqlModel/MySqlPlayerModel';
import { sequelizeConnection } from '../mySqlConnectionDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserSessionToken } from '../../../domain/entities/UserSessionToken';
import { Game } from '../../../domain/entities/Game';
import { Model } from 'sequelize';

dotenv.config()

const secret = process.env.SECRET_KEY ?? 'sin secretos';

export class mySqlGameRepository implements GameRepository {
    async postNewUser(newUser: Player): Promise<UserSessionToken | null> {

     
      const hashPassword = await encrypt(newUser.password);

      // If user is not anonymous, we must assure they don't have the same name as another user in the db

      const alreadyExists = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({
            where: {
                name: newUser.name
              }
       }); 
      });

      

      if (newUser.name !== 'Anonim'){

        let doesUserExist = alreadyExists.find((element) => element.toJSON().name == newUser.name);
        

        if (doesUserExist) {
          return null;
        }

      }

      // From now on, the user is NOT duplicate, and is either a new name OR anonim. So from now on, any operations can be done.
      

      // Find all players with our submitted name, just in case they are anonymous and have multiple entries in the db

      

      let comparePasswords: boolean[] = [];

      const allUsers = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({ }) });

        for(let i=0;i<allUsers.length;i++){
          
          const isSamePass = compare(newUser.password, allUsers[i].toJSON().password);

          comparePasswords.push(isSamePass);

          
          
        }

     
        

        
      // it doesn't compare the passwords. you're able to put wrong passwords in CHECK THIS PLEASE

      
        if (comparePasswords.some(match => match)) {
          
          return null;
        }

      

      
        let resultadoFinal: UserSessionToken | null;
        
      if (newUser.name === 'Anonim'){
        resultadoFinal = await mySqlPlayer.sync({}).then(()=>{

          const newPlayer = mySqlPlayer.build({ name: null, password: hashPassword});
  
          return newPlayer.save();
  
        
          })
          .then((data)=>{
            const token = jwt.sign({ id: data.toJSON().id.toString(), name: data.toJSON().name }, secret, {
              expiresIn: '2 days',
            })
  
            return { id: data.toJSON().id, name: data.toJSON().name, token: token };
  
          })
          .catch((err)=>{
            return null;
          })
      }else{
        resultadoFinal = await mySqlPlayer.sync({}).then(()=>{

          const newPlayer = mySqlPlayer.build({ name: newUser.name, password: hashPassword});
  
          return newPlayer.save();
  
        
          })
          .then((data)=>{
            const token = jwt.sign({ id: data.toJSON().id.toString(), name: data.toJSON().name }, secret, {
              expiresIn: '2 days',
            })
  
            return { id: data.toJSON().id, name: data.toJSON().name, token: token };
  
          })
          .catch((err)=>{
            return null;
          })
      }
      

        return resultadoFinal;
        
        
      
    }
  
    async postUserLogin(newUser: Player): Promise<UserSessionToken | null> {

      let isNameRegistered = await mySqlPlayer.sync().then(()=>{
          return mySqlPlayer.findAll({
              where: {
                  name: newUser.name
                }
         }); 
        });

      if (isNameRegistered && newUser.name === 'Anonim') {
         let allAnonimUsers = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({
            where: {
                name: null
              }
       }); 
      });

        const isUserRegistered = allAnonimUsers.find(objeto => compare(newUser.password, objeto.toJSON().password))
        if (isUserRegistered) {
          const token = jwt.sign({ id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().name }, secret, {
            expiresIn: '2 days',
          })
          return { id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().name, token: token }
        } else {
          
          return null;
        }  

     } else if (isNameRegistered){
      const isUserRegistered = isNameRegistered.find(objeto => compare(newUser.password, objeto.toJSON().password))

        if (isUserRegistered) {
          const token = jwt.sign({ id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().name }, secret, {
            expiresIn: '2 days',
          })
          return { id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().name, token: token }
        } else {
         
          return null;
        }  


     } else {
        
        return null;
      }
    }


    async findMaxWinner(): Promise<object | null> {
        const maxWinnerFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findOne({
          
              attributes:[
                'name', 'success_rate'
              ],
              group: ['name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'DESC'],
              ]
            }); 
          }).then((data)=>{

            return data
           

           }) 
        
        if (maxWinnerFunc) {
          
          return maxWinnerFunc;
        } else {
          
          return null;
        }
      }

      async findMinLoser(): Promise<object | null> {
        const minLoserFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findOne({
          
              attributes:[
                'name', 'success_rate'
              ],
              group: ['name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'ASC'],
              ]
            }); 
          }).then((data)=>{

            return data

           }) 
        
        if (minLoserFunc) {
          
          return minLoserFunc;
        } else {
          
          return null;
        }
      }

      async ratesListing(): Promise<object[] | null> {
        const ratesListFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findAll({
          
              attributes:[
                'name', 'success_rate'
              ],
              group: ['name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'DESC'],
              ]
            }); 
          }).then((data)=>{
            
            let listingArr: object[] = [];
            data.forEach((element)=>{
              listingArr.push(element)
              
            })
            return listingArr;
          });

    /* const totalAvg = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({
         attributes: [[sequelizeConnection.fn('AVG', sequelizeConnection.col('success_rate')),'total_avg']]
          
       }); 
      }).then((data)=>{
        let totalAvgText = '';
        data.forEach((element)=>{
            totalAvgText += `The total average of all players is: ${Math.trunc(element.toJSON().total_avg)}`;
        })
        return totalAvgText;
      }); */
        
        if (ratesListFunc) {
      
          
          return ratesListFunc;
        } else {
          
          return null;
        }
      }



      async allPlayersAndRatings(): Promise<object[] | null> {
        const allPlayersRatingsFunc = await mySqlPlayer.sync().then(()=>{
          return mySqlPlayer.findAll({
           attributes: {
             exclude: ['password']
           }
         }); 
        }).then((data)=>{
          let finalArr: object[] = [];
          data.forEach((element)=>{
           finalArr.push(element);
            
          })
          return finalArr
        });

        
        if (allPlayersRatingsFunc) {
            
          
          return allPlayersRatingsFunc;
        } else {
          
          return null;
        }
      }

 

      async modifyPlayerName(playerId: string, newName: string): Promise<boolean> {
        const isRegistered = await mySqlPlayer.sync().then(()=>{
          return mySqlPlayer.findOne({
              where: {
                id: playerId
                }
         }); 
        });
        if (!isRegistered) {
          
          return false;
        }
        
        await mySqlPlayer.sync({}).then(()=>{
          mySqlPlayer.update({ name: newName }, {
           where: {
            id: playerId
           }
         }); 
       });
       
        return true;
      }


    

      async playGame(playerId: number): Promise<object | null> {
        
        let didItWork = false;

        let finalGame = {dice_1:0, dice_2:0, winOrLose:false};
       
        await mySqlGame.sync({}).then(()=>{

         

          const dice1Random = Math.floor(Math.random() * 6) + 1;
          const dice2Random = Math.floor(Math.random() * 6) + 1;

          let resultOfGame = false;

          finalGame.dice_1 = dice1Random;
          finalGame.dice_2 = dice2Random;
          
          

          if (dice1Random+dice2Random === 7){
            resultOfGame = true;
          }

          finalGame.winOrLose = resultOfGame;
    
          const newGame = mySqlGame.build({ player_id: playerId, dice_1: dice1Random, dice_2: dice2Random, winOrLose: resultOfGame});
          return newGame.save();
          }).then(()=>{
          
          
          didItWork = true;
          })
          .catch((err)=>{
            throw err;
          });

          let totalLosses = 0;
          let totalWins = 0;
          await mySqlGame.sync({}).then(()=>{
            
            return mySqlGame.findAll({
              attributes: [
                [sequelizeConnection.fn('COUNT', sequelizeConnection.col('winOrLose')), 'numberOfLosses']
              ],
              where: {
                player_id: playerId,
                winOrLose: false
              }

            });}).then((data)=>{
              
              data.forEach((element)=>{
                totalLosses = element.toJSON().numberOfLosses;

              })
            })



            await mySqlGame.sync({}).then(()=>{
            
              return mySqlGame.findAll({
                attributes: [
                  [sequelizeConnection.fn('COUNT', sequelizeConnection.col('winOrLose')), 'numberOfWins']
                ],
                where: {
                  player_id: playerId,
                  winOrLose: true
                }
  
              });}).then((data)=>{
                
                data.forEach((element)=>{
                  totalWins = element.toJSON().numberOfWins;
  
                })
              })
              let playerTotalGames = totalLosses+totalWins;
              let playerSuccessRate = Math.trunc((totalWins / playerTotalGames)*100);

              

         
          await mySqlPlayer.sync({}).then(()=>{
            return mySqlPlayer.update({ success_rate: playerSuccessRate }, {
              where: {
                id: playerId
              }
            });
             
         })

          
        return finalGame;
      }


      async deleteAllGamesFromPlayer(playerId: number): Promise<boolean> {
        
        let didItWork = false;
       
        await mySqlGame.sync({}).then(()=>{
          return mySqlGame.destroy({
           where: {
            player_id: playerId
           }}); 
           
       }).then(()=>{
          
       
        didItWork = true;
        })
        .catch((err)=>{
        throw err;
        });

          
        return didItWork;
      }




      async listAllGamesFromPlayer(playerId: string): Promise<object[] | null> {
        
        let finalList: object[] = [];
       
        await mySqlGame.sync().then(()=>{
          return mySqlGame.findAll({
    where: {player_id: playerId}
         }); 
        }).then((data)=>{
         
          data.forEach((element, index)=>{
            finalList.push(element)
          })
          
        });

          
        return finalList;
      }

  }