import dotenv from 'dotenv';
import { UseCases } from '../../application/UseCases';


dotenv.config();

const bbdd = process.env.DATABASE;


let finalUseCases: UseCases;


 if (bbdd === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (bbdd === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}

console.log(bbdd + 'selected')
export { finalUseCases };
