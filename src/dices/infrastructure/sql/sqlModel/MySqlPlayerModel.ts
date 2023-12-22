import Sequelize from 'sequelize';
import { sequelizeConnection } from "../mySqlConnectionDB";

export const mySqlPlayer = sequelizeConnection.define('playerTest', {

    name:{type: Sequelize.DataTypes.STRING,
      allowNull: true,
    unique:true},
    password:{type: Sequelize.DataTypes.STRING,
      allowNull: false,
    unique:true
    },
    success_rate:{type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0}
  
  });