import { Player } from '../../../domain/entities/Player';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { mySqlGame } from '../sqlModel/MySqlGameModel';
import { mySqlPlayer } from '../sqlModel/MySqlPlayerModel';
import { sequelizeConnection } from '../mySqlConnectionDB';

export class mySqlGameRepository implements GameRepository {
    async postNewUser(newUser: Player): Promise<boolean> {
      const isRegistered = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findOne({
            where: {
                player_name: newUser.name
              }
       }); 
      });
      if (isRegistered) {
        console.log('false');
        return false;
      }
      console.log('true');
      await mySqlPlayer.sync({alter:true}).then(()=>{

        const newPlayer = mySqlPlayer.build({ player_name: newUser.name, player_password: newUser.password});
        return newPlayer.save();
        }).then(()=>{
        
        console.log("Players table created with new user!");
        })
        .catch(()=>{
        console.log('Error syncing table and model for PLAYER.')
        });
      return true;
    }
  
    async postUserLogin(newUser: Player): Promise<Player | null> {
      const isNameRegistered = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findOne({
            where: {
                player_name: newUser.name
              }
       }); 
      });
      const isPassRegistered = await mySqlPlayer.sync().then(()=>{
        return mySqlPlayer.findOne({
            where: {
                player_password: newUser.password
              }
       }); 
      });
      if (isPassRegistered && isNameRegistered) {
        console.log('success');
        return newUser;
      } else {
        console.log('try  again');
        return null;
      }
    }







 // De momento, todo al mismo tiempo que el login

    async findMaxWinner(): Promise<string | null> {
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
            return `The highest winner is ${data?.toJSON().player_name} with a score of ${data?.toJSON().success_rate}`;
           }) 
        
        if (maxWinnerFunc) {
          console.log(`success, ${maxWinnerFunc}`);
          return maxWinnerFunc;
        } else {
          console.log('try  again');
          return null;
        }
      }

      async findMinLoser(): Promise<string | null> {
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
            return `The lowest loser is ${data?.toJSON().player_name} with a score of ${data?.toJSON().success_rate}`;
           }) 
        
        if (minLoserFunc) {
          console.log(`success, ${minLoserFunc}`);
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
              listingText += `${element.toJSON().player_name} has a success rate of ${element.toJSON().success_rate}\n`;
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
            totalAvgText += `The total average of all players is: ${element.toJSON().total_avg}`;
        })
        return totalAvgText;
      });
        
        if (ratesListFunc && totalAvg) {
            let finalText = `success, ${ratesListFunc}, ${totalAvg}`;
          console.log(`success, ${ratesListFunc}, ${totalAvg}`);
          return finalText;
        } else {
          console.log('try  again');
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
            finalText += `Player name: ${element.toJSON().player_name}\n
            Success rate: ${element.toJSON().success_rate}\n`
          })
          return finalText
        }) 

        
        if (allPlayersRatingsFunc) {
            
          console.log(`success, ${allPlayersRatingsFunc}`);
          return allPlayersRatingsFunc;
        } else {
          console.log('try  again');
          return null;
        }
      }

      



      async modifyPlayerName(newUser: Player, newName: string): Promise<boolean> {
        const isRegistered = await mySqlPlayer.sync().then(()=>{
          return mySqlPlayer.findOne({
              where: {
                  player_name: newUser.name
                }
         }); 
        });
        if (isRegistered) {
          console.log('cannot change the name');
          return false;
        }
        console.log('name changed');
        await mySqlPlayer.sync({alter:true}).then(()=>{
          mySqlPlayer.update({ player_name: newName }, {
           where: {
             player_name: newUser.name
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




      async listAllGamesFromPlayer(playerId: number): Promise<string> {
        
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