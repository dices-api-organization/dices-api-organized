import Sequelize from 'sequelize';
import { sequelizeConnection } from "../mySqlConnectionDB";

export const mySqlGame = sequelizeConnection.define('gameTest', {

    player_id:{type: Sequelize.DataTypes.INTEGER,
      allowNull: false},
    dice_1:{type: Sequelize.DataTypes.INTEGER,
      allowNull: false},
      dice_2:{type: Sequelize.DataTypes.INTEGER,
        allowNull: false},
        winOrLose:{type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false}
  
  });