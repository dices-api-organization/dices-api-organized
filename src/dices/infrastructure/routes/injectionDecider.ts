import { nameDB } from '../mongoDB/mongoConnectionDB';
import { UseCases } from '../../application/UseCases';

let finalUseCases: UseCases;


 if (nameDB === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (nameDB === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}


export { finalUseCases };
