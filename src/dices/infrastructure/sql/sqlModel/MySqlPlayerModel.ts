import Sequelize from 'sequelize';
import { sequelizeConnection } from "../mySqlConnectionDB";

export const mySqlPlayer = sequelizeConnection.define('playerTest', {

    player_name:{type: Sequelize.DataTypes.STRING,
      allowNull: true,
    unique:true},
    player_password:{type: Sequelize.DataTypes.STRING,
      allowNull: false,
    unique:true
    },
    success_rate:{type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0}
  
  });