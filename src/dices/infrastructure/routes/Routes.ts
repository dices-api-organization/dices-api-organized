import { Router } from 'express';
//import { getPlayersController } from './getPlayersController';
//import { getStartIndexController } from './getStartIndexController';
import { postUserRegisterController } from './postUserRegisterController';
import { getUserLoginController } from './getUserLoginController';

export const dicesRouter = Router();

//dicesRouter.get('/', getStartIndexController);
//dicesRouter.get('/players', getPlayersController);
dicesRouter.get('/userLogin', getUserLoginController);
dicesRouter.post('/userRegister', postUserRegisterController);
