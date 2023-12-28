import dotenv from 'dotenv';
import { UseCases } from '../../application/UseCases';

dotenv.config()
let finalUseCases: UseCases;

const dataBaseChoice = process.env.DATABASE ?? ' error'

 if (dataBaseChoice === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (dataBaseChoice === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}


export { finalUseCases };
