

const flag = 'mysql';



// Need flag

import { UseCases } from '../../application/UseCases';

let finalUseCases: UseCases;


 if (flag === 'mysql') {
   finalUseCases = require('../sqlDependenyInjection').useCases;
 } else if (flag === 'mongodb') {
finalUseCases = require('../mongoDependencyInjection').useCases;
}


export { finalUseCases };
