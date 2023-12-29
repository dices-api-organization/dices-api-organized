import { UseCases } from '../../application/UseCases';
import { nameDB } from '../mongoDB/mongoConnectionDB';

let finalUseCases: UseCases;

if (nameDB === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (nameDB === 'mongodb') {
  finalUseCases = require('../mongoDependencyInjection').useCases;
}

export {finalUseCases}