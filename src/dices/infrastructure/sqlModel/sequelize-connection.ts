

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
  unique: true},
  player_password:{type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  success_rate:{type: Sequelize.DataTypes.INTEGER}

});

Player.sync({alter:true}).then(()=>{
//Working with our updated file
const testPlayer = Player.build({player_name:"TestName", player_password: "123456"});
return testPlayer.save();
}).then(()=>{

console.log("User added to database!");
})
.catch(()=>{
console.log('Error syncing table and model.')
})