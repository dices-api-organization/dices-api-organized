import dotenv from 'dotenv';
import Sequelize from 'sequelize';
dotenv.config();

const nameDB = process.env.DATABASE ?? 'error';
const mysqlPass = process.env.MYSQL_PASSWORD ?? 'error';
const mysqlUsername = process.env.MYSQL_USER ?? 'error';
const mysqlDatabaseName = process.env.MYSQL_DATABASE ?? 'error';

  export const sequelizeConnection = new Sequelize.Sequelize(mysqlDatabaseName, mysqlUsername, mysqlPass,{dialect:'mysql'});

  sequelizeConnection.authenticate().then(()=> {
    
      console.log(`${nameDB} database connected!`);
    
    }).catch((err: Error) =>{
      console.log("Error connecting to database!");
    });

