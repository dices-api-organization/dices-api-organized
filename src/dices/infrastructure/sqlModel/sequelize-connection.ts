
// If these scripts don't work, try docker-compose down -v to delete all past volumes, and restarting the containers


import Sequelize, { QueryError } from 'sequelize';


const sequelize = new Sequelize.Sequelize("dices-api-mysql-db", "root", "password",{dialect:'mysql'});

    sequelize.authenticate().then(()=> {
    
      console.log("Connection successful!");
    
    }).catch((err: Error) =>{
      console.log("Error connecting to database!");
    });



  const Player = sequelize.define('playerTest', {

  player_name:{type: Sequelize.DataTypes.STRING,
    allowNull: true,
  unique:true},
  player_password:{type: Sequelize.DataTypes.STRING,
    allowNull: false,
  unique:true
  },
  success_rate:{type: Sequelize.DataTypes.INTEGER}

});

const Game = sequelize.define('gameTest', {

  player_id:{type: Sequelize.DataTypes.INTEGER,
    allowNull: false},
  dice_1:{type: Sequelize.DataTypes.INTEGER,
    allowNull: false},
    dice_2:{type: Sequelize.DataTypes.INTEGER,
      allowNull: false},
      winOrLose:{type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false}

});

// PLAYER

// Create player table AND first player

// Change below to "force: true" to change column datatypes and create the table again from zero, and 'alter: true' to modify existing

Player.sync({force:true}).then(()=>{

const testPlayer = Player.build({ player_password: "123t4rt56"});
return testPlayer.save();
}).then(()=>{

console.log("Players table created with new user!");
})
.catch(()=>{
console.log('Error syncing table and model for PLAYER.')
});

// Create new player

Player.sync({alter:true}).then(()=>{
 
  const testPlayer = Player.build({ player_name: "Alan",player_password: "123t4rt56t"});
  return testPlayer.save();
  }).then(()=>{
  
  console.log("User added to Players database!");
  })
  .catch(()=>{
  console.log('Error creating new PLAYER.')
  });


  // Modify player name
  Player.sync({alter:true}).then(()=>{
   Player.update({ player_name: "Doe" }, {
    where: {
      player_name: "Alan"
    }
  }); 
});

// Find all players, with success rates

Player.sync({alter:true}).then(()=>{
  return Player.findAll({
   attributes: {
     exclude: ['player_password']
   }
 }); 
}).then((data)=>{
  data.forEach((element)=>{
    console.log(element.toJSON())
  })
})

// GAMES

// Create game AND first game

  Game.sync({force:true}).then(()=>{
    
    const testGame = Game.build({ player_id: 1, dice_1: 3, dice_2: 5, winOrLose: false});
    return testGame.save();
    }).then(()=>{
    
    console.log("Games table created and new game added to database!");
    })
    .catch(()=>{
    console.log('Error syncing table and model for GAMES.')
    });

    // A specific player creates a new game

    Game.sync({alter:true}).then(()=>{
    
      const testGame = Game.build({ player_id: 1, dice_1: 3, dice_2: 5, winOrLose: false});
      return testGame.save();
      }).then(()=>{
      
      console.log("Game added to database!");
      })
      .catch(()=>{
      console.log('Error creating new GAME.')
      }); 

      // Delete all games from a player

      Game.sync({alter:true}).then(()=>{
        Game.destroy({
         where: {
          player_id: 1
         }}); 
         
     });

     // Get list of all games from a player

     Game.sync({alter:true}).then(()=>{
      return Game.findAll({
where: {player_id: 1}
     }); 
    }).then((data)=>{
      data.forEach((element)=>{
        console.log(element.toJSON())
      })
    })