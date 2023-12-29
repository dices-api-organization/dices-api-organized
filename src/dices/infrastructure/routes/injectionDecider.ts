import dotenv from 'dotenv';
import { UseCases } from '../../application/UseCases';


dotenv.config();

let bbdd: string;

if (process.env.DATABASE){
   bbdd = process.env.DATABASE;
} else{
   bbdd = 'mongodb';
}




let finalUseCases: UseCases;


 if (bbdd === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (bbdd === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}

console.log(bbdd + 'selected')
export { finalUseCases };
