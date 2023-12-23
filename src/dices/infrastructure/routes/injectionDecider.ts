import { bbdd } from '../../../backend/createServerFunction';
import { UseCases } from '../../application/UseCases';

let finalUseCases: UseCases;


 if (bbdd === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (bbdd === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}

console.log(bbdd + 'selected')
export { finalUseCases };
