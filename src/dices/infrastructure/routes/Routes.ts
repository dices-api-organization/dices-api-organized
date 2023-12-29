import { Router } from 'express';
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

dicesRouter.post('/userLogin', postUserLoginController);
dicesRouter.post('/userRegister', postUserRegisterController);
dicesRouter.put('/update', putModifyPlayerNameController);
dicesRouter.delete('/update/delete', deleteAllGamesPlayerController);
dicesRouter.post('/play', postPlayGameController);
dicesRouter.get('/play/games', getAllGamesController);
dicesRouter.get('/play/players', getPlayersAndRatingsController);
dicesRouter.get('/play/rates', getRatesListingController);
dicesRouter.get('/play/min', getMinLoserController);
dicesRouter.get('/play/max', getMaxWinnerController);

