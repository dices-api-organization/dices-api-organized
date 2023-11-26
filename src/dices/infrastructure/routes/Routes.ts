import { Router } from 'express';
//import { getPlayersController } from './getPlayersController';
import { getStartIndexController } from './getStartIndexController';
//import { postUserLoginController } from './postUserLoginController';

export const dicesRouter = Router();

dicesRouter.get('/', getStartIndexController);
//dicesRouter.get('/players', getPlayersController);
//dicesRouter.post('/userValidation', postUserLoginController);
dicesRouter.post('/userRegister', postUserRegisterController);

