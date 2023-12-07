import { Router } from 'express';
//import { getPlayersController } from './getPlayersController';
//import { getStartIndexController } from './getStartIndexController';
import { postUserRegisterController } from './postUserRegisterController';
import { postUserLoginController } from './postUserLoginController';

export const dicesRouter = Router();

//dicesRouter.get('/', getStartIndexController);
//dicesRouter.get('/players', getPlayersController);
dicesRouter.post('/userLogin', postUserLoginController);
dicesRouter.post('/userRegister', postUserRegisterController);
