import { Router } from 'express';
//import { getPlayersController } from './getPlayersController';
import { getLoginController } from './getLoginController';

export const dicesRouter = Router();

dicesRouter.get('/', getLoginController);
//dicesRouter.get('/players', getPlayersController);
