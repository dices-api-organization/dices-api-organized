

const Sequelize = require('sequelize');

const sequelize = new Sequelize('dices_api_mysql_db', 'root', 'password',{dialect:'mysql'});

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


// Change below to "force: true" to change column datatypes and create the table again from zero, and 'alter: true' to modify existing

Player.sync({force:true}).then(()=>{
//Working with our updated file
const testPlayer = Player.build({ player_password: "123t4rt56"});
return testPlayer.save();
}).then(()=>{

console.log("User added to database!");
})
.catch(()=>{
console.log('Error syncing table and model for PLAYER.')
});

// GAMES


  Game.sync({force:true}).then(()=>{
    //Working with our updated file
    const testRolls = Game.build({ player_id: 1, dice_1: 3, dice_2: 5, winOrLose: false});
    return testRolls.save();
    }).then(()=>{
    
    console.log("Game added to database!");
    })
    .catch(()=>{
    console.log('Error syncing table and model for GAMES.')
    });