import { Router } from 'express';
//import { getPlayersController } from './getPlayersController';
//import { getStartIndexController } from './getStartIndexController';
import { postUserRegisterController } from './postUserRegisterController';
import { postUserLoginController } from './postUserLoginController';
import { putModifyPlayerNameController } from './putModifyPlayerNameController';
import { postPlayGameController } from './postPlayGameController';
import { deleteAllGamesPlayerController } from './deleteAllGamesPlayerController';
import { getAllGamesController } from './getAllGamesController';
import { getPlayersAndRatingsController } from './getPlayersAndRatingsController';
import { getRatesListingController } from './getRatesListingController';
import { getMinLoserController } from './getMinLoserController';
import { getMaxWinnerController } from './getMaxWinnerController';

export const dicesRouter = Router();

//dicesRouter.get('/', getStartIndexController);
//dicesRouter.get('/players', getPlayersController);
dicesRouter.post('/userLogin', postUserLoginController);
dicesRouter.post('/userRegister', postUserRegisterController);
dicesRouter.put('/update', putModifyPlayerNameController);
dicesRouter.delete('/update', deleteAllGamesPlayerController);
dicesRouter.post('/play', postPlayGameController);
dicesRouter.get('/play', getAllGamesController);
dicesRouter.get('/play', getPlayersAndRatingsController);
dicesRouter.get('/play', getRatesListingController);
dicesRouter.get('/play', getMinLoserController);
dicesRouter.get('/play', getMaxWinnerController);

