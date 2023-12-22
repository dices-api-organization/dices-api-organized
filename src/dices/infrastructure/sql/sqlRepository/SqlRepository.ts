import { compare, encrypt } from '../../../../backend/middleware/encrypt';
import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { mySqlGame } from '../sqlModel/MySqlGameModel';
import { mySqlPlayer } from '../sqlModel/MySqlPlayerModel';
import { sequelizeConnection } from '../mySqlConnectionDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserSessionToken } from '../../../domain/entities/UserSessionToken';
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
                player_name: newUser.name
              }
       }); 
      });

      

      if (newUser.name !== 'Anonim'){

        let doesUserExist = alreadyExists.find((element) => element.toJSON().player_name == newUser.name);
        

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
          
          const isSamePass = compare(newUser.password, allUsers[i].toJSON().player_password);

          comparePasswords.push(isSamePass);

          console.log('LAS  COMPARACIONES!!!!!!!!!!!!!!',isSamePass)
          
        }

        console.log('LAS PASSWORDS!!!!!!!!!!!!!!',comparePasswords)
        

        
      // it doesn't compare the passwords. you're able to put wrong passwords in CHECK THIS PLEASE

      
        if (comparePasswords.some(match => match)) {
          console.log('Login please!! There is a user with your credentials');
          return null;
        }

      

      
        let resultadoFinal: UserSessionToken | null;
        
      if (newUser.name === 'Anonim'){
        resultadoFinal = await mySqlPlayer.sync({alter:true}).then(()=>{

          const newPlayer = mySqlPlayer.build({ player_name: null, player_password: hashPassword});
  
          return newPlayer.save();
  
        
          })
          .then((data)=>{
            const token = jwt.sign({ id: data.toJSON().id.toString(), name: data.toJSON().player_name }, secret, {
              expiresIn: '2 days',
            })
  
            return { id: data.toJSON().id, name: data.toJSON().player_name, token: token };
  
          })
          .catch((err)=>{
            return null;
          })
      }else{
        resultadoFinal = await mySqlPlayer.sync({alter:true}).then(()=>{

          const newPlayer = mySqlPlayer.build({ player_name: newUser.name, player_password: hashPassword});
  
          return newPlayer.save();
  
        
          })
          .then((data)=>{
            const token = jwt.sign({ id: data.toJSON().id.toString(), name: data.toJSON().player_name }, secret, {
              expiresIn: '2 days',
            })
  
            return { id: data.toJSON().id, name: data.toJSON().player_name, token: token };
  
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
                  player_name: newUser.name
                }
         }); 
        });

      if (isNameRegistered && newUser.name === 'Anonim') {
         let allAnonimUsers = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({
            where: {
                player_name: null
              }
       }); 
      });

        const isUserRegistered = allAnonimUsers.find(objeto => compare(newUser.password, objeto.toJSON().player_password))
        if (isUserRegistered) {
          const token = jwt.sign({ id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().player_name }, secret, {
            expiresIn: '2 days',
          })
          return { id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().player_name, token: token }
        } else {
          console.log('User not found1');
          return null;
        }  

     } else if (isNameRegistered){
      const isUserRegistered = isNameRegistered.find(objeto => compare(newUser.password, objeto.toJSON().player_password))

        if (isUserRegistered) {
          const token = jwt.sign({ id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().player_name }, secret, {
            expiresIn: '2 days',
          })
          return { id: isUserRegistered.toJSON().id, name: isUserRegistered.toJSON().player_name, token: token }
        } else {
          console.log('User not found2');
          return null;
        }  


     } else {
        console.log('User not found3');
        return null;
      }
    }


    async findMaxWinner(): Promise<object | null> {
        const maxWinnerFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findOne({
          
              attributes:[
                'player_name', 'success_rate'
              ],
              group: ['player_name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'DESC'],
              ]
            }); 
          }).then((data)=>{

            if (data?.toJSON().player_name === null){
              return `The highest winner is Anonim with a score of ${data?.toJSON().success_rate}`;
            }else{
              return `The highest winner is ${data?.toJSON().player_name} with a score of ${data?.toJSON().success_rate}`;
            }
           

           }) 
        
        if (maxWinnerFunc) {
          console.log(`${maxWinnerFunc}`);
          return maxWinnerFunc;
        } else {
          console.log('try  again');
          return null;
        }
      }

      async findMinLoser(): Promise<object | null> {
        const minLoserFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findOne({
          
              attributes:[
                'player_name', 'success_rate'
              ],
              group: ['player_name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'ASC'],
              ]
            }); 
          }).then((data)=>{

            if (data?.toJSON().player_name === null){
              return `The lowest loser is Anonim with a score of ${data?.toJSON().success_rate}`;
            }else{
              return `The lowest loser is ${data?.toJSON().player_name} with a score of ${data?.toJSON().success_rate}`;
            }

           }) 
        
        if (minLoserFunc) {
          console.log(`${minLoserFunc}`);
          return minLoserFunc;
        } else {
          console.log('try  again');
          return null;
        }
      }

      async ratesListing(): Promise<string | null> {
        const ratesListFunc = await mySqlPlayer.sync().then(()=>{
            return mySqlPlayer.findAll({
          
              attributes:[
                'player_name', 'success_rate'
              ],
              group: ['player_name', 'success_rate'],
              order:[
                [sequelizeConnection.fn('max', sequelizeConnection.col('success_rate')), 'DESC'],
              ]
            }); 
          }).then((data)=>{
            
            let listingText = '';
            data.forEach((element)=>{
              if (element.toJSON().player_name === null){
                listingText += `Anonim has a success rate of ${element.toJSON().success_rate}\n`;
              }else{
                listingText += `${element.toJSON().player_name} has a success rate of ${element.toJSON().success_rate}\n`;
              }
              
            })
            return listingText;
          });

    const totalAvg = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findAll({
         attributes: [[sequelizeConnection.fn('AVG', sequelizeConnection.col('success_rate')),'total_avg']]
          
       }); 
      }).then((data)=>{
        let totalAvgText = '';
        data.forEach((element)=>{
            totalAvgText += `The total average of all players is: ${Math.trunc(element.toJSON().total_avg)}`;
        })
        return totalAvgText;
      });
        
        if (ratesListFunc && totalAvg) {
            let finalText = `${ratesListFunc}${totalAvg}`;
          console.log(`${ratesListFunc}, ${totalAvg}`);
          return finalText;
        } else {
          
          return null;
        }
      }



      async allPlayersAndRatings(): Promise<string | null> {
        const allPlayersRatingsFunc = await mySqlPlayer.sync().then(()=>{
          return mySqlPlayer.findAll({
           attributes: {
             exclude: ['player_password']
           }
         }); 
        }).then((data)=>{
          let finalText = '';
          data.forEach((element)=>{
            if (element.toJSON().player_name === null){
              finalText += `Player name: Anonim\n
              Success rate: ${element.toJSON().success_rate}\n`
            }else{
              finalText += `Player name: ${element.toJSON().player_name}\n
            Success rate: ${element.toJSON().success_rate}\n`
            }
            
          })
          return finalText
        }) 

        
        if (allPlayersRatingsFunc) {
            
          console.log(`${allPlayersRatingsFunc}`);
          return allPlayersRatingsFunc;
        } else {
          console.log('try  again');
          return null;
        }
      }

      



      async modifyPlayerName(playerId: number, newName: string): Promise<boolean> {
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
        
        await mySqlPlayer.sync({alter:true}).then(()=>{
          mySqlPlayer.update({ player_name: newName }, {
           where: {
            id: playerId
           }
         }); 
       });
       
        return true;
      }


      




      async playGame(playerId: number): Promise<boolean> {
        
        let didItWork = false;
       
        await mySqlGame.sync({alter:true}).then(()=>{

         

          let dice1Random = Math.floor(Math.random() * 7);
          let dice2Random = Math.floor(Math.random() * 7);

          let resultOfGame = false;

          if (dice1Random+dice2Random === 7){
            resultOfGame = true;
          }
    
          const newGame = mySqlGame.build({ player_id: playerId, dice_1: dice1Random, dice_2: dice2Random, winOrLose: resultOfGame});
          return newGame.save();
          }).then(()=>{
          
          console.log("New game added to database!");
          didItWork = true;
          })
          .catch(()=>{
          console.log('Error syncing table and model for GAMES.')
          });

          let totalLosses = 0;
          let totalWins = 0;
          await mySqlGame.sync({alter:true}).then(()=>{
            
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



            await mySqlGame.sync({alter:true}).then(()=>{
            
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

              

         
          await mySqlPlayer.sync({alter:true}).then(()=>{
            return mySqlPlayer.update({ success_rate: playerSuccessRate }, {
              where: {
                id: playerId
              }
            });
             
         })

          
        return didItWork;
      }





      async deleteAllGamesFromPlayer(playerId: number): Promise<boolean> {
        
        let didItWork = false;
       
        await mySqlGame.sync({alter:true}).then(()=>{
          return mySqlGame.destroy({
           where: {
            player_id: playerId
           }}); 
           
       }).then(()=>{
          
        console.log("All games deleted!");
        didItWork = true;
        })
        .catch(()=>{
        console.log('Error deleting games.')
        });

          
        return didItWork;
      }




      async listAllGamesFromPlayer(playerId: number): Promise<string | null> {
        
        let finalList = '';
       
        await mySqlGame.sync().then(()=>{
          return mySqlGame.findAll({
    where: {player_id: playerId}
         }); 
        }).then((data)=>{
         
          data.forEach((element, index)=>{
            finalList += `GAME NUMBER ${index+1}\n\n
            Dice 1: ${element.toJSON().dice_1}\n
            Dice 2: ${element.toJSON().dice_2}\n
            Was it a win? ${element.toJSON().winOrLose}\n\n\n`
          })
          
        });

          
        return finalList;
      }

  }